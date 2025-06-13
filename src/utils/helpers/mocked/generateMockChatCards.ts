import { Chat, IMessage } from '@/pages/chat/chat';

const names = ['Alex', 'Sonia', 'Norman', 'Aaron', 'Sergey', 'Dasha', 'Leo', 'Mia'];
const messages = ['Привет!', 'Как дела?', 'Скоро буду', 'Звони', 'Мяу', 'Ты где?'];

const avatars = [
  'https://image.winudf.com/v2/image/bW9iaS5hbmRyb2FwcC5wcm9zcGVyaXR5YXBwcy5jNTExMV9zY3JlZW5fN18xNTI0MDQxMDUwXzAyMQ/screen-7.jpg?fakeurl=1&type=.jpg',
  'https://avatars.mds.yandex.net/i?id=4fcc0778aea0031dc42a9069daf3afeb_l-5409727-images-thumbs&n=13',
  'https://i.pinimg.com/736x/a2/be/84/a2be8451ee40d2d46448df6346a52edf.jpg',
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomBoolean(probability = 0.5): boolean {
  return Math.random() < probability;
}

function generateMockMessages(): IMessage[] {
  const count = Math.floor(Math.random() * 5) + 1;

  return Array.from({ length: count }, (_, i) => ({
    messageText: getRandomItem(messages),
    incoming: getRandomBoolean(),
    outgoing: !getRandomBoolean(),
    timestamp: `10:${i}0`,
    unread: getRandomBoolean(0.5),
  }));
}

export function generateMockChats(count: number): Chat[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    isOnline: getRandomBoolean(),
    nickName: getRandomItem(names),
    avatarUrl: getRandomItem(avatars),
    dialogMessages: generateMockMessages(),
  }));
}
