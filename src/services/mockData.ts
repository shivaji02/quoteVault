// Mock data for demo mode - No Supabase required
import type { Quote, User, Favorite, Collection } from '../types';

// 100+ quotes across 8 categories
export const MOCK_QUOTES: Quote[] = [
  // MOTIVATION (15)
  { id: '1', text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs', category: 'motivation', created_at: new Date().toISOString() },
  { id: '2', text: 'Believe you can and you\'re halfway there.', author: 'Theodore Roosevelt', category: 'motivation', created_at: new Date().toISOString() },
  { id: '3', text: 'It does not matter how slowly you go as long as you do not stop.', author: 'Confucius', category: 'motivation', created_at: new Date().toISOString() },
  { id: '4', text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', author: 'Winston Churchill', category: 'motivation', created_at: new Date().toISOString() },
  { id: '5', text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt', category: 'motivation', created_at: new Date().toISOString() },
  { id: '6', text: 'Strive not to be a success, but rather to be of value.', author: 'Albert Einstein', category: 'motivation', created_at: new Date().toISOString() },
  { id: '7', text: 'The only limit to our realization of tomorrow will be our doubts of today.', author: 'Franklin D. Roosevelt', category: 'motivation', created_at: new Date().toISOString() },
  { id: '8', text: 'What you get by achieving your goals is not as important as what you become by achieving your goals.', author: 'Zig Ziglar', category: 'motivation', created_at: new Date().toISOString() },
  { id: '9', text: 'Your time is limited, don\'t waste it living someone else\'s life.', author: 'Steve Jobs', category: 'motivation', created_at: new Date().toISOString() },
  { id: '10', text: 'The best time to plant a tree was 20 years ago. The second best time is now.', author: 'Chinese Proverb', category: 'motivation', created_at: new Date().toISOString() },
  { id: '11', text: 'Don\'t watch the clock; do what it does. Keep going.', author: 'Sam Levenson', category: 'motivation', created_at: new Date().toISOString() },
  { id: '12', text: 'Everything you\'ve ever wanted is on the other side of fear.', author: 'George Addair', category: 'motivation', created_at: new Date().toISOString() },
  { id: '13', text: 'The only impossible journey is the one you never begin.', author: 'Tony Robbins', category: 'motivation', created_at: new Date().toISOString() },
  { id: '14', text: 'Act as if what you do makes a difference. It does.', author: 'William James', category: 'motivation', created_at: new Date().toISOString() },
  { id: '15', text: 'What lies behind us and what lies before us are tiny matters compared to what lies within us.', author: 'Ralph Waldo Emerson', category: 'motivation', created_at: new Date().toISOString() },

  // LOVE (15)
  { id: '16', text: 'The best thing to hold onto in life is each other.', author: 'Audrey Hepburn', category: 'love', created_at: new Date().toISOString() },
  { id: '17', text: 'Love is composed of a single soul inhabiting two bodies.', author: 'Aristotle', category: 'love', created_at: new Date().toISOString() },
  { id: '18', text: 'Where there is love there is life.', author: 'Mahatma Gandhi', category: 'love', created_at: new Date().toISOString() },
  { id: '19', text: 'You know you\'re in love when you can\'t fall asleep because reality is finally better than your dreams.', author: 'Dr. Seuss', category: 'love', created_at: new Date().toISOString() },
  { id: '20', text: 'The greatest thing you\'ll ever learn is just to love and be loved in return.', author: 'Eden Ahbez', category: 'love', created_at: new Date().toISOString() },
  { id: '21', text: 'To love and be loved is to feel the sun from both sides.', author: 'David Viscott', category: 'love', created_at: new Date().toISOString() },
  { id: '22', text: 'Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope.', author: 'Maya Angelou', category: 'love', created_at: new Date().toISOString() },
  { id: '23', text: 'The heart has its reasons which reason knows not.', author: 'Blaise Pascal', category: 'love', created_at: new Date().toISOString() },
  { id: '24', text: 'Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.', author: 'Lao Tzu', category: 'love', created_at: new Date().toISOString() },
  { id: '25', text: 'Love is when the other person\'s happiness is more important than your own.', author: 'H. Jackson Brown Jr.', category: 'love', created_at: new Date().toISOString() },
  { id: '26', text: 'In all the world, there is no heart for me like yours.', author: 'Maya Angelou', category: 'love', created_at: new Date().toISOString() },
  { id: '27', text: 'The best love is the kind that awakens the soul and makes us reach for more.', author: 'Nicholas Sparks', category: 'love', created_at: new Date().toISOString() },
  { id: '28', text: 'Love is friendship that has caught fire.', author: 'Ann Landers', category: 'love', created_at: new Date().toISOString() },
  { id: '29', text: 'A loving heart is the truest wisdom.', author: 'Charles Dickens', category: 'love', created_at: new Date().toISOString() },
  { id: '30', text: 'Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.', author: 'Unknown', category: 'love', created_at: new Date().toISOString() },

  // SUCCESS (15)
  { id: '31', text: 'Success usually comes to those who are too busy to be looking for it.', author: 'Henry David Thoreau', category: 'success', created_at: new Date().toISOString() },
  { id: '32', text: 'The road to success and the road to failure are almost exactly the same.', author: 'Colin R. Davis', category: 'success', created_at: new Date().toISOString() },
  { id: '33', text: 'Success is walking from failure to failure with no loss of enthusiasm.', author: 'Winston Churchill', category: 'success', created_at: new Date().toISOString() },
  { id: '34', text: 'Don\'t be afraid to give up the good to go for the great.', author: 'John D. Rockefeller', category: 'success', created_at: new Date().toISOString() },
  { id: '35', text: 'I find that the harder I work, the more luck I seem to have.', author: 'Thomas Jefferson', category: 'success', created_at: new Date().toISOString() },
  { id: '36', text: 'Success is not the key to happiness. Happiness is the key to success.', author: 'Albert Schweitzer', category: 'success', created_at: new Date().toISOString() },
  { id: '37', text: 'The secret of success is to do the common thing uncommonly well.', author: 'John D. Rockefeller Jr.', category: 'success', created_at: new Date().toISOString() },
  { id: '38', text: 'Try not to become a man of success. Rather become a man of value.', author: 'Albert Einstein', category: 'success', created_at: new Date().toISOString() },
  { id: '39', text: 'Success is getting what you want. Happiness is wanting what you get.', author: 'Dale Carnegie', category: 'success', created_at: new Date().toISOString() },
  { id: '40', text: 'The only place where success comes before work is in the dictionary.', author: 'Vidal Sassoon', category: 'success', created_at: new Date().toISOString() },
  { id: '41', text: 'Success seems to be connected with action. Successful people keep moving.', author: 'Conrad Hilton', category: 'success', created_at: new Date().toISOString() },
  { id: '42', text: 'There are no secrets to success. It is the result of preparation, hard work, and learning from failure.', author: 'Colin Powell', category: 'success', created_at: new Date().toISOString() },
  { id: '43', text: 'Success is not how high you have climbed, but how you make a positive difference to the world.', author: 'Roy T. Bennett', category: 'success', created_at: new Date().toISOString() },
  { id: '44', text: 'The successful warrior is the average man, with laser-like focus.', author: 'Bruce Lee', category: 'success', created_at: new Date().toISOString() },
  { id: '45', text: 'Success is liking yourself, liking what you do, and liking how you do it.', author: 'Maya Angelou', category: 'success', created_at: new Date().toISOString() },

  // WISDOM (15)
  { id: '46', text: 'The only true wisdom is in knowing you know nothing.', author: 'Socrates', category: 'wisdom', created_at: new Date().toISOString() },
  { id: '47', text: 'In the middle of difficulty lies opportunity.', author: 'Albert Einstein', category: 'wisdom', created_at: new Date().toISOString() },
  { id: '48', text: 'The mind is everything. What you think you become.', author: 'Buddha', category: 'wisdom', created_at: new Date().toISOString() },
  { id: '49', text: 'Knowledge speaks, but wisdom listens.', author: 'Jimi Hendrix', category: 'wisdom', created_at: new Date().toISOString() },
  { id: '50', text: 'The wise man does at once what the fool does finally.', author: 'Niccolo Machiavelli', category: 'wisdom', created_at: new Date().toISOString() },
  { id: '51', text: 'Turn your wounds into wisdom.', author: 'Oprah Winfrey', category: 'wisdom', created_at: new Date().toISOString() },
  { id: '52', text: 'The more I read, the more I acquire, the more certain I am that I know nothing.', author: 'Voltaire', category: 'wisdom', created_at: new Date().toISOString() },
  { id: '53', text: 'Wisdom is not a product of schooling but of the lifelong attempt to acquire it.', author: 'Albert Einstein', category: 'wisdom', created_at: new Date().toISOString() },
  { id: '54', text: 'By three methods we may learn wisdom: First, by reflection, which is noblest; Second, by imitation, which is easiest; and third by experience, which is the bitterest.', author: 'Confucius', category: 'wisdom', created_at: new Date().toISOString() },
  { id: '55', text: 'The fool doth think he is wise, but the wise man knows himself to be a fool.', author: 'William Shakespeare', category: 'wisdom', created_at: new Date().toISOString() },
  { id: '56', text: 'It is the mark of an educated mind to be able to entertain a thought without accepting it.', author: 'Aristotle', category: 'wisdom', created_at: new Date().toISOString() },
  { id: '57', text: 'Knowing yourself is the beginning of all wisdom.', author: 'Aristotle', category: 'wisdom', created_at: new Date().toISOString() },
  { id: '58', text: 'The journey of a thousand miles begins with one step.', author: 'Lao Tzu', category: 'wisdom', created_at: new Date().toISOString() },
  { id: '59', text: 'He who knows others is wise. He who knows himself is enlightened.', author: 'Lao Tzu', category: 'wisdom', created_at: new Date().toISOString() },
  { id: '60', text: 'Patience is the companion of wisdom.', author: 'Saint Augustine', category: 'wisdom', created_at: new Date().toISOString() },

  // HUMOR (12)
  { id: '61', text: 'I\'m not superstitious, but I am a little stitious.', author: 'Michael Scott', category: 'humor', created_at: new Date().toISOString() },
  { id: '62', text: 'Behind every great man is a woman rolling her eyes.', author: 'Jim Carrey', category: 'humor', created_at: new Date().toISOString() },
  { id: '63', text: 'I\'m not lazy, I\'m on energy-saving mode.', author: 'Unknown', category: 'humor', created_at: new Date().toISOString() },
  { id: '64', text: 'The only mystery in life is why the kamikaze pilots wore helmets.', author: 'Al McGuire', category: 'humor', created_at: new Date().toISOString() },
  { id: '65', text: 'I used to think I was indecisive, but now I\'m not so sure.', author: 'Unknown', category: 'humor', created_at: new Date().toISOString() },
  { id: '66', text: 'Light travels faster than sound. This is why some people appear bright until you hear them speak.', author: 'Alan Dundes', category: 'humor', created_at: new Date().toISOString() },
  { id: '67', text: 'I\'m not arguing, I\'m just explaining why I\'m right.', author: 'Unknown', category: 'humor', created_at: new Date().toISOString() },
  { id: '68', text: 'The road to success is dotted with many tempting parking spaces.', author: 'Will Rogers', category: 'humor', created_at: new Date().toISOString() },
  { id: '69', text: 'I\'m on a whiskey diet. I\'ve lost three days already.', author: 'Tommy Cooper', category: 'humor', created_at: new Date().toISOString() },
  { id: '70', text: 'Age is something that doesn\'t matter, unless you are a cheese.', author: 'Luis Buñuel', category: 'humor', created_at: new Date().toISOString() },
  { id: '71', text: 'I always wanted to be somebody, but now I realize I should have been more specific.', author: 'Lily Tomlin', category: 'humor', created_at: new Date().toISOString() },
  { id: '72', text: 'A day without laughter is a day wasted.', author: 'Charlie Chaplin', category: 'humor', created_at: new Date().toISOString() },

  // LIFE (12)
  { id: '73', text: 'Life is what happens when you\'re busy making other plans.', author: 'John Lennon', category: 'life', created_at: new Date().toISOString() },
  { id: '74', text: 'In three words I can sum up everything I\'ve learned about life: it goes on.', author: 'Robert Frost', category: 'life', created_at: new Date().toISOString() },
  { id: '75', text: 'Life is really simple, but we insist on making it complicated.', author: 'Confucius', category: 'life', created_at: new Date().toISOString() },
  { id: '76', text: 'The purpose of our lives is to be happy.', author: 'Dalai Lama', category: 'life', created_at: new Date().toISOString() },
  { id: '77', text: 'Life is 10% what happens to us and 90% how we react to it.', author: 'Charles R. Swindoll', category: 'life', created_at: new Date().toISOString() },
  { id: '78', text: 'Life is either a daring adventure or nothing at all.', author: 'Helen Keller', category: 'life', created_at: new Date().toISOString() },
  { id: '79', text: 'The biggest adventure you can take is to live the life of your dreams.', author: 'Oprah Winfrey', category: 'life', created_at: new Date().toISOString() },
  { id: '80', text: 'Life is short, and it is up to you to make it sweet.', author: 'Sarah Louise Delany', category: 'life', created_at: new Date().toISOString() },
  { id: '81', text: 'Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.', author: 'Buddha', category: 'life', created_at: new Date().toISOString() },
  { id: '82', text: 'Life is a journey, not a destination.', author: 'Ralph Waldo Emerson', category: 'life', created_at: new Date().toISOString() },
  { id: '83', text: 'The unexamined life is not worth living.', author: 'Socrates', category: 'life', created_at: new Date().toISOString() },
  { id: '84', text: 'Life isn\'t about finding yourself. Life is about creating yourself.', author: 'George Bernard Shaw', category: 'life', created_at: new Date().toISOString() },

  // FRIENDSHIP (12)
  { id: '85', text: 'A friend is someone who knows all about you and still loves you.', author: 'Elbert Hubbard', category: 'friendship', created_at: new Date().toISOString() },
  { id: '86', text: 'Friendship is born at that moment when one person says to another, "What! You too? I thought I was the only one."', author: 'C.S. Lewis', category: 'friendship', created_at: new Date().toISOString() },
  { id: '87', text: 'A real friend is one who walks in when the rest of the world walks out.', author: 'Walter Winchell', category: 'friendship', created_at: new Date().toISOString() },
  { id: '88', text: 'True friendship comes when the silence between two people is comfortable.', author: 'David Tyson', category: 'friendship', created_at: new Date().toISOString() },
  { id: '89', text: 'Friends are the family you choose.', author: 'Jess C. Scott', category: 'friendship', created_at: new Date().toISOString() },
  { id: '90', text: 'The greatest gift of life is friendship, and I have received it.', author: 'Hubert H. Humphrey', category: 'friendship', created_at: new Date().toISOString() },
  { id: '91', text: 'A single rose can be my garden... a single friend, my world.', author: 'Leo Buscaglia', category: 'friendship', created_at: new Date().toISOString() },
  { id: '92', text: 'Walking with a friend in the dark is better than walking alone in the light.', author: 'Helen Keller', category: 'friendship', created_at: new Date().toISOString() },
  { id: '93', text: 'Friendship is the only cement that will ever hold the world together.', author: 'Woodrow Wilson', category: 'friendship', created_at: new Date().toISOString() },
  { id: '94', text: 'There is nothing on this earth more to be prized than true friendship.', author: 'Thomas Aquinas', category: 'friendship', created_at: new Date().toISOString() },
  { id: '95', text: 'Friends show their love in times of trouble, not in happiness.', author: 'Euripides', category: 'friendship', created_at: new Date().toISOString() },
  { id: '96', text: 'A friend is one that knows you as you are, understands where you have been, and still allows you to grow.', author: 'William Shakespeare', category: 'friendship', created_at: new Date().toISOString() },

  // HAPPINESS (12)
  { id: '97', text: 'Happiness is not something ready made. It comes from your own actions.', author: 'Dalai Lama', category: 'happiness', created_at: new Date().toISOString() },
  { id: '98', text: 'The secret of happiness is not in doing what one likes, but in liking what one does.', author: 'James M. Barrie', category: 'happiness', created_at: new Date().toISOString() },
  { id: '99', text: 'Happiness is when what you think, what you say, and what you do are in harmony.', author: 'Mahatma Gandhi', category: 'happiness', created_at: new Date().toISOString() },
  { id: '100', text: 'The happiness of your life depends upon the quality of your thoughts.', author: 'Marcus Aurelius', category: 'happiness', created_at: new Date().toISOString() },
  { id: '101', text: 'Happiness is not a goal; it is a by-product.', author: 'Eleanor Roosevelt', category: 'happiness', created_at: new Date().toISOString() },
  { id: '102', text: 'For every minute you are angry you lose sixty seconds of happiness.', author: 'Ralph Waldo Emerson', category: 'happiness', created_at: new Date().toISOString() },
  { id: '103', text: 'Count your age by friends, not years. Count your life by smiles, not tears.', author: 'John Lennon', category: 'happiness', created_at: new Date().toISOString() },
  { id: '104', text: 'The most important thing is to enjoy your life—to be happy—it\'s all that matters.', author: 'Audrey Hepburn', category: 'happiness', created_at: new Date().toISOString() },
  { id: '105', text: 'Happiness is a warm puppy.', author: 'Charles M. Schulz', category: 'happiness', created_at: new Date().toISOString() },
  { id: '106', text: 'Think of all the beauty still left around you and be happy.', author: 'Anne Frank', category: 'happiness', created_at: new Date().toISOString() },
  { id: '107', text: 'Happiness depends upon ourselves.', author: 'Aristotle', category: 'happiness', created_at: new Date().toISOString() },
  { id: '108', text: 'The only way to find true happiness is to risk being completely cut open.', author: 'Chuck Palahniuk', category: 'happiness', created_at: new Date().toISOString() },
];

// Get quote of the day (changes daily based on date)
export const getQuoteOfDay = (): Quote => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const index = dayOfYear % MOCK_QUOTES.length;
  return { ...MOCK_QUOTES[index], is_quote_of_day: true };
};

// Demo user
export const DEMO_USER: User = {
  id: 'demo-user-1',
  email: 'demo@quotevault.app',
  display_name: 'Quote Lover',
  avatar_url: null,
  created_at: new Date().toISOString(),
  notification_time: '09:00',
  theme: 'light',
  font_size: 'medium',
};

// Initial demo favorites
export const INITIAL_FAVORITES: string[] = ['1', '16', '46', '97'];

// Initial demo collections
export const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: 'col-1',
    user_id: 'demo-user-1',
    name: 'Morning Motivation',
    description: 'Quotes to start the day right',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    quote_count: 3,
  },
  {
    id: 'col-2',
    user_id: 'demo-user-1',
    name: 'Work Inspiration',
    description: 'For tough days at work',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    quote_count: 2,
  },
];

// Collection quotes mapping
export const COLLECTION_QUOTES: { [collectionId: string]: string[] } = {
  'col-1': ['1', '4', '9'],
  'col-2': ['31', '44'],
};
