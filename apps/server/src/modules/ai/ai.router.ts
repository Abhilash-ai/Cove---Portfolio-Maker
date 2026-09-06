import { Router, Response } from 'express';
import { prisma } from '../../prisma.js';
import { authenticateToken, AuthenticatedRequest } from '../../middleware/auth.js';
import { aiService } from '../../services/ai/ai.service.js';
import { CopilotInput } from '@cove/shared';

export const aiRouter = Router();
aiRouter.use(authenticateToken);

// 1. POST /api/v1/ai/copilot - Execute AI writing assistant command
aiRouter.post('/copilot', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { command, contextType = 'project', text = '', metadata = {}, targetId = '' } = req.body;

    if (!command) {
      res.status(400).json({
        success: false,
        error: { code: 'INVALID_COMMAND', message: 'Command is required' }
      });
      return;
    }

    const input: CopilotInput = {
      command,
      contextType,
      text: String(text),
      metadata
    };

    const output = await aiService.executeCopilot(input);

    // Record interaction in AI Conversation & Action audit tables
    let conversation = await prisma.aIConversation.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    if (!conversation) {
      conversation = await prisma.aIConversation.create({
        data: {
          userId,
          contextType,
          contextId: targetId || null,
          title: `Copilot ${contextType} assistant`
        }
      });
    }

    const action = await prisma.aIAction.create({
      data: {
        conversationId: conversation.id,
        command,
        targetEntity: contextType,
        targetId: targetId || 'draft',
        beforeState: { text: input.text },
        proposedState: {
          suggestion: output.suggestion,
          titles: output.titles || null,
          caseStudy: output.caseStudy || null,
          imageRecommendations: output.imageRecommendations || null,
          rationale: output.rationale,
          diffSummary: output.diffSummary,
          undoToken: output.undoToken
        },
        status: 'proposed'
      }
    });

    res.status(200).json({
      success: true,
      data: {
        ...output,
        actionId: action.id
      }
    });
  } catch (err: any) {
    console.error('AI Copilot execution error:', err);
    res.status(500).json({
      success: false,
      error: { code: 'AI_EXECUTION_ERROR', message: err.message || 'Failed to execute Copilot command' }
    });
  }
});

// 2. POST /api/v1/ai/copilot/accept - Mark AI proposal as accepted
aiRouter.post('/copilot/accept', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { actionId } = req.body;
    if (!actionId) {
      res.status(400).json({ success: false, error: { code: 'MISSING_ACTION_ID', message: 'actionId is required' } });
      return;
    }

    const action = await prisma.aIAction.findUnique({
      where: { id: actionId },
      include: { conversation: true }
    });

    if (!action || action.conversation.userId !== req.user!.id) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Action record not found' } });
      return;
    }

    const updated = await prisma.aIAction.update({
      where: { id: actionId },
      data: {
        status: 'accepted',
        appliedAt: new Date()
      }
    });

    res.status(200).json({ success: true, data: { action: updated } });
  } catch (err: any) {
    console.error('Accept action error:', err);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to accept action' } });
  }
});

// 3. POST /api/v1/ai/copilot/undo - Revert accepted action and retrieve prior state
aiRouter.post('/copilot/undo', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { actionId } = req.body;
    if (!actionId) {
      res.status(400).json({ success: false, error: { code: 'MISSING_ACTION_ID', message: 'actionId is required' } });
      return;
    }

    const action = await prisma.aIAction.findUnique({
      where: { id: actionId },
      include: { conversation: true }
    });

    if (!action || action.conversation.userId !== req.user!.id) {
      res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Action record not found' } });
      return;
    }

    const reverted = await prisma.aIAction.update({
      where: { id: actionId },
      data: { status: 'reverted' }
    });

    res.status(200).json({
      success: true,
      data: {
        action: reverted,
        beforeState: action.beforeState
      }
    });
  } catch (err: any) {
    console.error('Undo action error:', err);
    res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to revert action' } });
  }
});
