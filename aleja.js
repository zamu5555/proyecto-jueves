const drink = document.getElementById('btn-drink');
const bell = document.getElementById('recipe-drink');
const home = document.getElementById('home-time');



drink.addEventListener('click', async (event) => {
    console.log('Button clicked!', event);

    bell.innerHTML = '<p>Searching.... </p>';

    try {
        const cocktail = await getDrunk();


        if (cocktail && cocktail.length > 0) {
            const drinkData = cocktail[0];


            bell.innerHTML = '<p><strong>Here is your recipe drink. Enjoy it!! </strong></p>';


            setTimeout(() => {
                bell.innerHTML = `
          <h3>${drinkData.name}</h3>
          <p><strong>Ingredients:</strong> ${drinkData.ingredients.join(', ')}</p>
          <p><strong>Instructions:</strong> ${drinkData.instructions}</p>
        `;
            }, 1500);
        }
    } catch (error) {
        alert('Error getting recipe drink. Please try again!');
        bell.innerHTML = '<p> Error loading recipe</p>';
    }
});

home.addEventListener('click', () => {

    window.location.href = 'index.html';

});


async function getDrunk() {

    const cocktails = ['Margarita', 'Mojito', 'Cosmopolitan', 'Martini', 'Daiquiri',
        'Manhattan', 'Negroni', 'Old Fashioned', 'Whiskey Sour'];

    const randomCocktail = cocktails[Math.floor(Math.random() * cocktails.length)];
    const url = `https://api.api-ninjas.com/v1/cocktail?name=${randomCocktail}`;

    try {
        const response = await fetch(url, {
            headers: {
                'X-Api-Key': '3qLD8weSmrXugwvnFPR9vA==11jT0Zps7o3W2utP'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const drinks = await response.json();
        console.log('Here is your recipe drink:', drinks);
        return drinks;

    } catch (error) {
        console.error('Drink not found. Try again, please:', error);
        throw error;
    }
}