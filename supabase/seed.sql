-- QuoteVault Seed Data - 100+ Quotes across 8 categories
-- Run this after schema.sql

-- MOTIVATION QUOTES (15)
INSERT INTO public.quotes (text, author, category) VALUES
('The only way to do great work is to love what you do.', 'Steve Jobs', 'motivation'),
('Believe you can and you''re halfway there.', 'Theodore Roosevelt', 'motivation'),
('It does not matter how slowly you go as long as you do not stop.', 'Confucius', 'motivation'),
('Success is not final, failure is not fatal: it is the courage to continue that counts.', 'Winston Churchill', 'motivation'),
('The future belongs to those who believe in the beauty of their dreams.', 'Eleanor Roosevelt', 'motivation'),
('Strive not to be a success, but rather to be of value.', 'Albert Einstein', 'motivation'),
('The only limit to our realization of tomorrow will be our doubts of today.', 'Franklin D. Roosevelt', 'motivation'),
('What you get by achieving your goals is not as important as what you become by achieving your goals.', 'Zig Ziglar', 'motivation'),
('Your time is limited, don''t waste it living someone else''s life.', 'Steve Jobs', 'motivation'),
('The best time to plant a tree was 20 years ago. The second best time is now.', 'Chinese Proverb', 'motivation'),
('Don''t watch the clock; do what it does. Keep going.', 'Sam Levenson', 'motivation'),
('Everything you''ve ever wanted is on the other side of fear.', 'George Addair', 'motivation'),
('The only impossible journey is the one you never begin.', 'Tony Robbins', 'motivation'),
('Act as if what you do makes a difference. It does.', 'William James', 'motivation'),
('What lies behind us and what lies before us are tiny matters compared to what lies within us.', 'Ralph Waldo Emerson', 'motivation');

-- LOVE QUOTES (15)
INSERT INTO public.quotes (text, author, category) VALUES
('The best thing to hold onto in life is each other.', 'Audrey Hepburn', 'love'),
('Love is composed of a single soul inhabiting two bodies.', 'Aristotle', 'love'),
('Where there is love there is life.', 'Mahatma Gandhi', 'love'),
('You know you''re in love when you can''t fall asleep because reality is finally better than your dreams.', 'Dr. Seuss', 'love'),
('The greatest thing you''ll ever learn is just to love and be loved in return.', 'Eden Ahbez', 'love'),
('Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.', 'Unknown', 'love'),
('To love and be loved is to feel the sun from both sides.', 'David Viscott', 'love'),
('Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope.', 'Maya Angelou', 'love'),
('The heart has its reasons which reason knows not.', 'Blaise Pascal', 'love'),
('Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.', 'Lao Tzu', 'love'),
('Love is when the other person''s happiness is more important than your own.', 'H. Jackson Brown Jr.', 'love'),
('In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.', 'Maya Angelou', 'love'),
('The best love is the kind that awakens the soul and makes us reach for more.', 'Nicholas Sparks', 'love'),
('Love is friendship that has caught fire.', 'Ann Landers', 'love'),
('A loving heart is the truest wisdom.', 'Charles Dickens', 'love');

-- SUCCESS QUOTES (15)
INSERT INTO public.quotes (text, author, category) VALUES
('Success usually comes to those who are too busy to be looking for it.', 'Henry David Thoreau', 'success'),
('The road to success and the road to failure are almost exactly the same.', 'Colin R. Davis', 'success'),
('Success is walking from failure to failure with no loss of enthusiasm.', 'Winston Churchill', 'success'),
('Don''t be afraid to give up the good to go for the great.', 'John D. Rockefeller', 'success'),
('I find that the harder I work, the more luck I seem to have.', 'Thomas Jefferson', 'success'),
('Success is not the key to happiness. Happiness is the key to success.', 'Albert Schweitzer', 'success'),
('The secret of success is to do the common thing uncommonly well.', 'John D. Rockefeller Jr.', 'success'),
('Try not to become a man of success. Rather become a man of value.', 'Albert Einstein', 'success'),
('Success is getting what you want. Happiness is wanting what you get.', 'Dale Carnegie', 'success'),
('The only place where success comes before work is in the dictionary.', 'Vidal Sassoon', 'success'),
('Success seems to be connected with action. Successful people keep moving.', 'Conrad Hilton', 'success'),
('There are no secrets to success. It is the result of preparation, hard work, and learning from failure.', 'Colin Powell', 'success'),
('Success is not how high you have climbed, but how you make a positive difference to the world.', 'Roy T. Bennett', 'success'),
('The successful warrior is the average man, with laser-like focus.', 'Bruce Lee', 'success'),
('Success is liking yourself, liking what you do, and liking how you do it.', 'Maya Angelou', 'success');

-- WISDOM QUOTES (15)
INSERT INTO public.quotes (text, author, category) VALUES
('The only true wisdom is in knowing you know nothing.', 'Socrates', 'wisdom'),
('In the middle of difficulty lies opportunity.', 'Albert Einstein', 'wisdom'),
('The mind is everything. What you think you become.', 'Buddha', 'wisdom'),
('Knowledge speaks, but wisdom listens.', 'Jimi Hendrix', 'wisdom'),
('The wise man does at once what the fool does finally.', 'Niccolo Machiavelli', 'wisdom'),
('Turn your wounds into wisdom.', 'Oprah Winfrey', 'wisdom'),
('The more I read, the more I acquire, the more certain I am that I know nothing.', 'Voltaire', 'wisdom'),
('Wisdom is not a product of schooling but of the lifelong attempt to acquire it.', 'Albert Einstein', 'wisdom'),
('By three methods we may learn wisdom: First, by reflection, which is noblest; Second, by imitation, which is easiest; and third by experience, which is the bitterest.', 'Confucius', 'wisdom'),
('The fool doth think he is wise, but the wise man knows himself to be a fool.', 'William Shakespeare', 'wisdom'),
('It is the mark of an educated mind to be able to entertain a thought without accepting it.', 'Aristotle', 'wisdom'),
('Knowing yourself is the beginning of all wisdom.', 'Aristotle', 'wisdom'),
('The journey of a thousand miles begins with one step.', 'Lao Tzu', 'wisdom'),
('He who knows others is wise. He who knows himself is enlightened.', 'Lao Tzu', 'wisdom'),
('Patience is the companion of wisdom.', 'Saint Augustine', 'wisdom');

-- HUMOR QUOTES (12)
INSERT INTO public.quotes (text, author, category) VALUES
('I''m not superstitious, but I am a little stitious.', 'Michael Scott', 'humor'),
('Behind every great man is a woman rolling her eyes.', 'Jim Carrey', 'humor'),
('I''m not lazy, I''m on energy-saving mode.', 'Unknown', 'humor'),
('The only mystery in life is why the kamikaze pilots wore helmets.', 'Al McGuire', 'humor'),
('I used to think I was indecisive, but now I''m not so sure.', 'Unknown', 'humor'),
('Light travels faster than sound. This is why some people appear bright until you hear them speak.', 'Alan Dundes', 'humor'),
('I''m not arguing, I''m just explaining why I''m right.', 'Unknown', 'humor'),
('The road to success is dotted with many tempting parking spaces.', 'Will Rogers', 'humor'),
('I''m on a whiskey diet. I''ve lost three days already.', 'Tommy Cooper', 'humor'),
('Age is something that doesn''t matter, unless you are a cheese.', 'Luis Buñuel', 'humor'),
('I always wanted to be somebody, but now I realize I should have been more specific.', 'Lily Tomlin', 'humor'),
('A day without laughter is a day wasted.', 'Charlie Chaplin', 'humor');

-- LIFE QUOTES (12)
INSERT INTO public.quotes (text, author, category) VALUES
('Life is what happens when you''re busy making other plans.', 'John Lennon', 'life'),
('In three words I can sum up everything I''ve learned about life: it goes on.', 'Robert Frost', 'life'),
('Life is really simple, but we insist on making it complicated.', 'Confucius', 'life'),
('The purpose of our lives is to be happy.', 'Dalai Lama', 'life'),
('Life is 10% what happens to us and 90% how we react to it.', 'Charles R. Swindoll', 'life'),
('Life is either a daring adventure or nothing at all.', 'Helen Keller', 'life'),
('The biggest adventure you can take is to live the life of your dreams.', 'Oprah Winfrey', 'life'),
('Life is short, and it is up to you to make it sweet.', 'Sarah Louise Delany', 'life'),
('Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.', 'Buddha', 'life'),
('Life is a journey, not a destination.', 'Ralph Waldo Emerson', 'life'),
('The unexamined life is not worth living.', 'Socrates', 'life'),
('Life isn''t about finding yourself. Life is about creating yourself.', 'George Bernard Shaw', 'life');

-- FRIENDSHIP QUOTES (12)
INSERT INTO public.quotes (text, author, category) VALUES
('A friend is someone who knows all about you and still loves you.', 'Elbert Hubbard', 'friendship'),
('Friendship is born at that moment when one person says to another, ''What! You too? I thought I was the only one.''', 'C.S. Lewis', 'friendship'),
('A real friend is one who walks in when the rest of the world walks out.', 'Walter Winchell', 'friendship'),
('True friendship comes when the silence between two people is comfortable.', 'David Tyson', 'friendship'),
('Friends are the family you choose.', 'Jess C. Scott', 'friendship'),
('A friend is one that knows you as you are, understands where you have been, accepts what you have become, and still, gently allows you to grow.', 'William Shakespeare', 'friendship'),
('The greatest gift of life is friendship, and I have received it.', 'Hubert H. Humphrey', 'friendship'),
('A single rose can be my garden... a single friend, my world.', 'Leo Buscaglia', 'friendship'),
('Walking with a friend in the dark is better than walking alone in the light.', 'Helen Keller', 'friendship'),
('Friendship is the only cement that will ever hold the world together.', 'Woodrow Wilson', 'friendship'),
('There is nothing on this earth more to be prized than true friendship.', 'Thomas Aquinas', 'friendship'),
('Friends show their love in times of trouble, not in happiness.', 'Euripides', 'friendship');

-- HAPPINESS QUOTES (12)
INSERT INTO public.quotes (text, author, category) VALUES
('Happiness is not something ready made. It comes from your own actions.', 'Dalai Lama', 'happiness'),
('The secret of happiness is not in doing what one likes, but in liking what one does.', 'James M. Barrie', 'happiness'),
('Happiness is when what you think, what you say, and what you do are in harmony.', 'Mahatma Gandhi', 'happiness'),
('The happiness of your life depends upon the quality of your thoughts.', 'Marcus Aurelius', 'happiness'),
('Happiness is not a goal; it is a by-product.', 'Eleanor Roosevelt', 'happiness'),
('For every minute you are angry you lose sixty seconds of happiness.', 'Ralph Waldo Emerson', 'happiness'),
('Count your age by friends, not years. Count your life by smiles, not tears.', 'John Lennon', 'happiness'),
('The most important thing is to enjoy your life—to be happy—it''s all that matters.', 'Audrey Hepburn', 'happiness'),
('Happiness is a warm puppy.', 'Charles M. Schulz', 'happiness'),
('Think of all the beauty still left around you and be happy.', 'Anne Frank', 'happiness'),
('Happiness depends upon ourselves.', 'Aristotle', 'happiness'),
('The only way to find true happiness is to risk being completely cut open.', 'Chuck Palahniuk', 'happiness');

-- Set a default quote of the day
INSERT INTO public.quote_of_day (quote_id, date)
SELECT id, CURRENT_DATE
FROM public.quotes
WHERE text = 'The only way to do great work is to love what you do.'
LIMIT 1;
