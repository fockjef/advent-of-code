/* --- Day 15: Science for Hungry People --- */

function silver(numCalories) {
    let ingredients = parseInput(x =>
            Object.fromEntries(x.match(/\w+ -?\w+/g).map(q => q.split(' ')))
        ),
        recipes = getItemCounts(ingredients.length, 100),
        maxScore = -Infinity;
    while (1) {
        let recipe = recipes.next().value;
        if (!recipe) break;
        let {score, calories} = scoreRecipe(recipe, ingredients);
        if (
            (numCalories == undefined || calories == numCalories) &&
            score > maxScore
        )
            maxScore = score;
    }
    return maxScore;
}

function gold() {
    return silver(500);
}

function scoreRecipe(recipe, ingredients) {
    let score = {
        capacity: 0,
        durability: 0,
        flavor: 0,
        texture: 0,
        calories: 0
    };
    Object.keys(score).forEach(k =>
        recipe.forEach((amt, i) => (score[k] += amt * ingredients[i][k]))
    );
    let calories = score.calories;
    delete score.calories;
    return {
        calories,
        score: Object.values(score)
            .map(s => (s < 0 ? 0 : s))
            .prod()
    };
}

function* getItemCounts(numItems, totalItems, itemCounts = []) {
    if (numItems == 1) {
        yield itemCounts.concat(totalItems);
    } else {
        for (let i = 0; i <= totalItems; i++) {
            yield* getItemCounts(
                numItems - 1,
                totalItems - i,
                itemCounts.concat(i)
            );
        }
    }
}
