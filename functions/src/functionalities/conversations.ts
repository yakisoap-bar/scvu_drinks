import * as functions from "firebase-functions";
import {Context} from 'grammy'
import {
    type Conversation,
    type ConversationFlavor
} from '@grammyjs/conversations'

// type definitions for conversations
type MyContext = Context & ConversationFlavor;
type MyConversation = Conversation<MyContext>;

// Conversations
export async function getName(conversation: MyConversation, ctx: MyContext) {
    await ctx.reply('Hi! Before we continue, I will need your name as written on the fridge list.');
    
    // get user reply
    ctx = await conversation.waitFor('message:text');
    functions.logger.info(ctx.message?.text);

    // confirm with user if name is correct
    await ctx.reply(
        `Just to make sure, \`${ctx.message?.text}\` is what you want to register?`,
        {parse_mode: 'MarkdownV2'}
    );
    return;
}