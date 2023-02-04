<template>
  <div class="about">
    <h1>Contact form</h1>
    
<div class="contactForm">
   <h3>Please contact us:</h3>
   <form>
      <label>Name:</label>
      <input type="text" name="name" placeholder="Your name...">
      <label>Email:</label>
      <input type="email" name="email" placeholder="Your email...">
      <label>Message:</label>
      <textarea name="message" placeholder="Your message..."></textarea>
      <input type="submit" value="Send">
   </form>
</div>
  </div>
</template>

<style scoped>
   .contactForm {
      width: 500px;
      padding: 10px;
      background-color: #f2f2f2;
      border: 1px solid #ccc;
      margin: auto;
      border-radius: 4px;
   }

   label {
    margin: 20px;
   }

   .contactForm label {
      display: block;
      margin-bottom: 5px;
   }

   .contactForm input[type="submit"]:active {
      scale: 110%;
   }

   .contactForm input[type="text"],
   .contactForm input[type="email"],
   .contactForm textarea {
      width: 100%;
      padding: 8px 8px;
      box-sizing: border-box;
      border: 1px solid #8c8c8c;
      border-radius: 4px;
      font-size: 16px;
   }

   .contactForm input[type="submit"] {
      background-color: #a4e2a6;
      color: black;
      padding: 8px 12px;
      margin-top: 5px;
      border: 1px solid #8c8c8c;
      border-radius: 4px;
      font-size: 16px;
   }

   .contactForm input[type="submit"]:hover {
      background-color: #43fb4d;
      font-weight: bold;
   }
</style>
