
import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';


const steps = [
  {
    id: '0',
    message: 'Hello! How can I help you with our Sri Lankan native flowers today?',
    trigger: '1',
  },
  {
    id: '1',
    options: [
      { value: 'organic', label: 'Are your flowers organic?', trigger: 'organic' },
      { value: 'giftWrap', label: 'Do you have gift wrapping options?', trigger: 'giftWrap' },
      { value: 'sameDayDelivery', label: 'Do you offer same-day delivery?', trigger: 'sameDayDelivery' },
      { value: 'scheduleDelivery', label: 'Can I schedule a delivery date?', trigger: 'scheduleDelivery' },
      { value: 'fixedPrices', label: 'Are your prices fixed?', trigger: 'fixedPrices' },
      { value: 'minOrder', label: 'Is there a minimum order amount?', trigger: 'minOrder' },
      { value: 'preOrder', label: 'Can I pre-order flowers?', trigger: 'preOrder' },
      { value: 'mobileApp', label: 'Do you have a mobile app?', trigger: 'mobileApp' },
      { value: 'seedsPlants', label: 'Do you sell flower seeds or plants?', trigger: 'seedsPlants' },
      { value: 'delayedOrder', label: 'My order is delayed. What now?', trigger: 'delayedOrder' },
      { value: 'phoneOrder', label: 'Can I order via phone?', trigger: 'phoneOrder' },
      { value: 'damagedPlant', label: 'I got a damaged plant. Can I get a replacement?', trigger: 'damagedPlant' },
      { value: 'paymentMethods', label: 'What payment methods do you accept?', trigger: 'paymentMethods' },
      { value: 'loyaltyProgram', label: 'Is there a loyalty program?', trigger: 'loyaltyProgram' },
      { value: 'notHomeDelivery', label: 'What happens if I\'m not home during delivery?', trigger: 'notHomeDelivery' },
      { value: 'promoCode', label: 'How do I apply a promo code?', trigger: 'promoCode' },
      { value: 'changeAddress', label: 'How do I change my delivery address?', trigger: 'changeAddress' },
      { value: 'forgotDiscount', label: 'I forgot to apply my discount. Can I still get it?', trigger: 'forgotDiscount' },
      { value: 'returnProduct', label: 'I want to return a product. How?', trigger: 'returnProduct' },
      { value: 'beginnerFlower', label: 'Which flower is best for beginners?', trigger: 'beginnerFlower' },
      { value: 'identifyNative', label: 'How do I identify native flowers?', trigger: 'identifyNative' },
      { value: 'wateringNative', label: 'How often should I water native plants?', trigger: 'wateringNative' },
      { value: 'mixNativeExotic', label: 'Can I mix native flowers with exotic ones?', trigger: 'mixNativeExotic' },
      { value: 'droughtResistant', label: 'Are native flowers drought-resistant?', trigger: 'droughtResistant' },
      { value: 'biodiversitySupport', label: 'How do native flowers support biodiversity?', trigger: 'biodiversitySupport' },
      { value: 'butterflyAttract', label: 'Which native flowers attract butterflies?', trigger: 'butterflyAttract' },
      { value: 'petSafe', label: 'Are native flowers safe for pets?', trigger: 'petSafe' },
      { value: 'growInPots', label: 'Can I grow native flowers in pots?', trigger: 'growInPots' },
      { value: 'whatIsNative', label: 'What makes a flower native?', trigger: 'whatIsNative' },
      { value: 'flowerTypes', label: 'What kind of flowers do you sell?', trigger: 'flowerTypes' },
      { value: 'moreInfo', label: 'Tell me more about...', trigger: 'moreInfoOptions' },
    ],
  },
  {
    id: 'organic',
    message: 'Yes! Our flowers are grown naturally without harmful chemicals.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'giftWrap',
    message: 'Yes! Add gift wrapping at checkout for that special touch.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'sameDayDelivery',
    message: 'We offer same-day delivery in selected areas - check your location at checkout.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'scheduleDelivery',
    message: 'Absolutely! Just choose your preferred date during checkout.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'fixedPrices',
    message: 'Yes, all prices are clearly listed - no surprises!',
    trigger: 'askPlantingTips',
  },
  {
    id: 'minOrder',
    message: 'Nope! You can order as little or as much as you like.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'preOrder',
    message: 'Yes, pre-ordering ensures your flowers are reserved just for you!',
    trigger: 'askPlantingTips',
  },
  {
    id: 'mobileApp',
    message: 'Our mobile app is coming soon! Until then, you can shop easily on our website.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'seedsPlants',
    message: 'We offer both seeds and young plants of native varieties.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'delayedOrder',
    message: 'Sorry about that! Share your order ID and we\'ll update you right away.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'phoneOrder',
    message: 'Sure! Call our hotline and our team will assist with your order.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'damagedPlant',
    message: 'Oh no! Please send us a photo and we\'ll sort it out quickly.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'paymentMethods',
    message: 'We accept cards, bank transfers, and mobile payments.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'loyaltyProgram',
    message: 'Yes! You earn points with every purchase - use them for future discounts.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'notHomeDelivery',
    message: 'Our courier will call you. You can reschedule or choose a drop-off point.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'promoCode',
    message: 'At checkout, simply enter your promo code in the box provided.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'changeAddress',
    message: 'Message us with your new address before the item ships.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'forgotDiscount',
    message: 'Message us right away and we\'ll help if the order is fresh.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'returnProduct',
    message: 'Just contact us within 3 days and we\'ll guide you through the process.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'beginnerFlower',
    message: 'Araliya is a great starter - beautiful and easy to care for.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'identifyNative',
    message: 'Look at leaf shape, color, and bloom pattern - or use our app!',
    trigger: 'askPlantingTips',
  },
  {
    id: 'wateringNative',
    message: 'Usually 2-3 times a week, depending on the plant and weather.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'mixNativeExotic',
    message: 'Yes, just be sure they share similar soil and sunlight needs.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'droughtResistant',
    message: 'Most of them are! They\'re adapted to local climates.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'biodiversitySupport',
    message: 'They provide food and habitat for local pollinators and insects.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'butterflyAttract',
    message: 'Butterflies love flowers like Nil Manel, Erabadu, and Suriya.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'petSafe',
    message: 'Most are, but always double-check - we label pet-safe plants clearly.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'growInPots',
    message: 'Yes! Many do great in containers with proper soil and care.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'whatIsNative',
    message: 'Native flowers naturally grow in Sri Lanka without human introduction.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'flowerTypes',
    message: 'We specialize in Sri Lanka\'s beautiful native flowers, like Araliya and Nil Manel.',
    trigger: 'askPlantingTips',
  },
  {
    id: 'moreInfoOptions',
    message: 'Which topic would you like more information on?',
    trigger: '1', // Go back to the main options
  },
  {
    id: 'askPlantingTips',
    message: 'Let us know if you\'d like planting tips too!',
    trigger: '1', // Go back to the main options
  },
];

const theme = {
  background: 'white',
  headerBgColor: '#fa9c23',
  headerFontSize: '20px',
  botBubbleColor: '#fa9c23',
  headerFontColor: 'white',
  botFontColor: 'white',
  userBubbleColor: '#FF5733',
  userFontColor: 'white',
};

const config = {
  botAvatar: "/images/chatbot.webp", 
  floating: true,
};

function FlowerChatBot() {
  return (
      <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle="Sri Lankan Flowers"
          steps={steps}
          {...config}
        />
      </ThemeProvider>
  );
}

export default FlowerChatBot;