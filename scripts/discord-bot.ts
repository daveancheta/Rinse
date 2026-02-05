import { discordMessages } from '@/db/schema';
import db from '@/index';
import { Client, GatewayIntentBits, Events } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL not found!');
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, () => {
  console.log(`✅ Bot logged in as ${client.user?.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  try {
    await db.insert(discordMessages).values({
      messageId: message.id,
      channelId: message.channelId,
      authorId: message.author.id,
      authorUsername: message.author.username,
      content: message.content,
      timestamp: message.createdAt,
      rawData: message.toJSON() as any,
    });

    console.log(`💾 Saved: ${message.author.username}: ${message.content}`);
  } catch (error) {
    console.error('Error saving message:', error);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);