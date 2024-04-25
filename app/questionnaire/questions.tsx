const questions = [
    {
      question: "What is your destination?",
      inputType: "search"
    },
    {
      question: "When do you want to go?",
      inputType: "date"
    },
    {
      question: "Who's coming with you?",
      inputType: "singleOptions", 
      options: ["Couple", "Solo", "Friends", "Family"]
    },
    {
      question: "How do you want to spend your time?",
      inputType: "multipleOptions",
      options: ["Beach", "Hiking", "Sightseeing", "Shopping"]
    },
    {
      question: "Choose your preference:",
      inputType: "singleOptions", 
      options: ["I want to do it manually", "Generated AI"]
    }
  ];
  
  export default questions;
  