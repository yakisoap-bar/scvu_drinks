import * as functions from "firebase-functions";
import {Bot, type Context, session} from 'grammy';
import {
    type ConversationFlavor,
    conversations,
    createConversation
} from '@grammyjs/conversations'

// import conversations
import * as convos from './functionalities/conversations';


// config bot
type MyContext = Context & ConversationFlavor;
export const bot = new Bot<MyContext>(functions.config().telegram.token);


// add middleware for bot to use
bot.use(session({
    initial() {
        return {};
    },
}));
bot.use(conversations());

// import conversations
bot.use(createConversation(convos.getName));


// --- MAIN PROGRAM --- //
// main cancel command
bot.command('cancel', async ctx => {
    await ctx.conversation.exit();
})

bot.command('start', async ctx => {
    await ctx.conversation.enter('getName');
})