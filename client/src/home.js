export const Home = ($app) => {
  return ($app.innerHTML = `
    <h1 class="text-3xl font-bold underline">
      Hello world! 
      
    </h1>
    <p class="text-3xl font-bold underline user-name"></p>
    `);
};
