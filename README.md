# Nuemmerle
"Nümmerle" (German for little numbers) is a game (see the readme). The contents of this repository are attempts at automating a solver for this game without ML.

## The Game
The game consists of 15x6 (= 90) numbered cards per player, 6 cards of each number 1 through 15. The cards are drawn from the pile of cards of one player at random, this player is called the "Auskreischer" (German for shreaker). All other players must follow this player's random sequence - and are encouraged to vent their frustrations blaming the Auskreischer for the horrible sequence of randomly drawn numbers. Players following the sequence should order their cards in 15 stacks of 6 identical cards, before the game starts. The "Auskreicher" should mix their cards and make a pile where no player, including themselves, can read the numbers.

The aim is to create six stacks of cards counting from 1 to 15, stacks may only start with 1 and must be continuuous. As the numbers are selected in random order, players wil need parking spots for cards they cannot currently place on any stack – especially until the first 1 is drawn to open the first stack. Parking must be arranged in five rows, players may only place cards at the end of a row and may only take cards off the end of a row. Cards/numbers in parking-rows may only be picked up to be placed on a stack, you may not move cards from one parking-row to another.

### Winning
When all numbers have been shreaked, add up the value of your stacks, highest possible score is six stacks of 15 = 90 points.

### Tips
- Try to start new parking-rows with high numbers.
- Avoid parking higher numbers beneath lower numbers, as you will need the lower numbers first for your stacks, you may find your higher numbers blocking acces to lower numbers.
- Keep track of the availability of numbers, so you don't block access to a number that won't be shreaked again.

# This Git
This git contains a first attempt at a solver, implemented in JS as a website. Use it to get a feel for how the game works.
