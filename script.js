document.addEventListener("DOMContentLoaded", () => {
    
    //Initialize Stuff
    const answers = document.querySelectorAll(".answer");
    const moneyValues = document.querySelectorAll(".money");
    const questionElement = document.getElementById("question");
    const answer1 = document.getElementById("answer1");
    const answer2 = document.getElementById("answer2");
    const answer3 = document.getElementById("answer3");
    const answer4 = document.getElementById("answer4");
    const answerButtons = [answer1, answer2, answer3, answer4];
    let currentLevel = 0;
    let currentQuestion = 0;
    let startCnt = true;
    let settingsCnt = true;
    let detailsCnt = true;
    let aboutCnt = true;
    let shuffledQuestions = [];
    const closeSettingsButton = document.getElementById("closeSettingsButton");
    const settings = document.getElementById("settings");
    settings.style.visibility = 'hidden';
    const closeDetailsButton = document.getElementById("closeDetailsButton");
    const details = document.getElementById("details");
    details.style.visibility = 'hidden';
    const closeAboutButton = document.getElementById("closeAboutButton");
    const about = document.getElementById("about");
    about.style.visibility = 'hidden';
    
    function shuffleQuestions(questions) {
        return questions.sort(() => Math.random() - 0.5);
    }

    function resetMoneyLadder() {
        moneyValues.forEach(money => {
            money.classList.remove("active");
            money.classList.remove("correct");
        });
    }
    
    function resetOptions() {
        answerButtons.forEach((button, index) => {
                button.disabled = false;
                button.style.visibility = 'visible';    
                button.classList.remove("correct"); 
                button.classList.remove("incorrect"); 
        });
    }

    function resetLifelines() {
        document.getElementById('lifeline-5050').style.visibility = 'visible';
        document.getElementById('lifeline-5050').disabled = false;
        document.getElementById('lifeline-phone').style.visibility = 'visible';
        document.getElementById('lifeline-phone').disabled = false;
        document.getElementById('lifeline-audience').style.visibility = 'visible';
        document.getElementById('lifeline-audience').disabled = false;
    }

    function startScreen() {
        resetMoneyLadder();
        resetOptions();
        shuffledQuestions = shuffleQuestions(easyQuestions);
        currentQuestion = 0;
        currentLevel = 0;
        moneyValues[0].classList.remove("active");
        questionElement.textContent = "Here will be the question...";
        startCnt = true;
        settingsCnt = true;
        detailsCnt = true;
        aboutCnt = true;
        answer1.textContent = "Start";
        answer2.textContent = "Settings";
        answer3.textContent = "Details";
        answer4.textContent = "About";
        document.getElementById('lifeline-5050').disabled = true;
        document.getElementById('lifeline-phone').disabled = true;
        document.getElementById('lifeline-audience').disabled = true;
    }

    function settingsScreen() {
        settings.style.visibility = 'visible';
        answer1.disabled = true;
        answer2.disabled = true;
        answer3.disabled = true;
        answer4.disabled = true;
    }

    closeSettingsButton.addEventListener("click", () => {
        settings.style.visibility = 'hidden';
        settingsCnt = true;
        answer1.disabled = false;
        answer2.disabled = false;
        answer3.disabled = false;
        answer4.disabled = false;
    });

    function detailsScreen() {
        details.style.visibility = 'visible';
        answer1.disabled = true;
        answer2.disabled = true;
        answer3.disabled = true;
        answer4.disabled = true;
    }

    closeDetailsButton.addEventListener("click", () => {
        details.style.visibility = 'hidden';
        detailsCnt = true;
        answer1.disabled = false;
        answer2.disabled = false;
        answer3.disabled = false;
        answer4.disabled = false;
    });

    function aboutScreen() {
        about.style.visibility = 'visible';
        answer1.disabled = true;
        answer2.disabled = true;
        answer3.disabled = true;
        answer4.disabled = true;
    }

    closeAboutButton.addEventListener("click", () => {
        about.style.visibility = 'hidden';
        aboutCnt = true;
        answer1.disabled = false;
        answer2.disabled = false;
        answer3.disabled = false;
        answer4.disabled = false;
    });


    function use5050() {
        const currentQuestionObj = shuffledQuestions[currentQuestion];
        const correctAnswer = currentQuestionObj.correct;
        let otherCnt = 0;
        let otherIndex = 4;
        while (otherCnt < 1) {
            const randomIndex = Math.floor(Math.random() * 4);
            if (randomIndex !== correctAnswer) {
                otherIndex = randomIndex;
                otherCnt++;
            }
        }
        
        answerButtons.forEach((button, index) => {
            if (index !== correctAnswer && index !== otherIndex) {
                button.disabled = true;
                button.style.visibility = 'hidden';
            }
        });
    
        document.getElementById('lifeline-5050').style.visibility = 'hidden';
        document.getElementById('lifeline-5050').disabled = true;
    }
    
    function usePhoneAFriend() {
        alert("Your friend thinks the correct answer is: " + shuffledQuestions[currentQuestion].answers[shuffledQuestions[currentQuestion].correct]);
        document.getElementById('lifeline-phone').style.visibility = 'hidden';
        document.getElementById('lifeline-phone').disabled = true;
    }
    
    function useAskTheAudience() {
        let audienceVotes = [0, 0, 0, 0];
        const correctIndex = shuffledQuestions[currentQuestion].correct;
    
        const correctPercentage = Math.floor(Math.random() * 41) + 60;
        audienceVotes[correctIndex] = correctPercentage;
    
        let remainingPercentage = 100 - correctPercentage;
        const nonCorrectIndices = [0, 1, 2, 3].filter(index => index !== correctIndex);
    
        nonCorrectIndices.forEach((index) => {
            if (remainingPercentage > 0) {
                let percentage = Math.floor(Math.random() * (remainingPercentage + 1));
                audienceVotes[index] = percentage;
                remainingPercentage -= percentage;
            }
        });
    
        if (remainingPercentage > 0) {
            audienceVotes[nonCorrectIndices[nonCorrectIndices.length - 1]] += remainingPercentage;
        }
    
        alert(`Audience votes:\nA: ${audienceVotes[0]}%\nB: ${audienceVotes[1]}%\nC: ${audienceVotes[2]}%\nD: ${audienceVotes[3]}%`);
        document.getElementById('lifeline-audience').disabled = true;
        document.getElementById('lifeline-audience').style.visibility = 'hidden';
    }
    
    
    document.getElementById('lifeline-5050').addEventListener("click", use5050);
    document.getElementById('lifeline-phone').addEventListener("click", usePhoneAFriend);
    document.getElementById('lifeline-audience').addEventListener("click", useAskTheAudience);

    


    const easyQuestions = [
            {
                question: "What is the capital of France?",
                answers: ["Berlin", "Madrid", "Paris", "Rome"],
                correct: 2
            },
            {
                question: "Which planet is known as the Red Planet?",
                answers: ["Earth", "Mars", "Jupiter", "Venus"],
                correct: 1
            },
            {
                question: "What is the largest ocean on Earth?",
                answers: ["Atlantic Ocean", "Indian Ocean", "Southern Ocean", "Pacific Ocean"],
                correct: 3
            },
            {
                question: "How many continents are there?",
                answers: ["5", "6", "7", "8"],
                correct: 2
            },
            {
                question: "What is the tallest mountain in the world?",
                answers: ["Mount Everest", "K2", "Mount Kilimanjaro", "Mount Fuji"],
                correct: 0
            },
            {
                question: "What is the chemical symbol for water?",
                answers: ["H2O", "O2", "CO2", "HO"],
                correct: 0
            },
            {
                question: "What is the largest mammal?",
                answers: ["Elephant", "Whale", "Giraffe", "Hippopotamus"],
                correct: 1
            },
            {
                question: "How many sides does a triangle have?",
                answers: ["2", "3", "4", "5"],
                correct: 1
            },
            {
                question: "Who painted the Mona Lisa?",
                answers: ["Vincent van Gogh", "Claude Monet", "Pablo Picasso", "Leonardo da Vinci"],
                correct: 3
            },
            {
                question: "Which planet is closest to the Sun?",
                answers: ["Earth", "Venus", "Mercury", "Mars"],
                correct: 2
            },
            {
                question: "Which country is famous for the Great Wall?",
                answers: ["India", "China", "Japan", "Russia"],
                correct: 1
            },
            {
                question: "Which sport is known as the 'king of sports'?",
                answers: ["Basketball", "Cricket", "Soccer", "Tennis"],
                correct: 2
            },
            {
                question: "How many colors are in a rainbow?",
                answers: ["5", "6", "7", "8"],
                correct: 2
            },
            {
                question: "Who was the first President of the United States?",
                answers: ["Abraham Lincoln", "Thomas Jefferson", "George Washington", "John Adams"],
                correct: 2
            },
            {
                question: "What is the freezing point of water?",
                answers: ["0°C", "32°C", "50°C", "100°C"],
                correct: 0
            },
            {
                question: "What is the hardest natural substance on Earth?",
                answers: ["Gold", "Iron", "Diamond", "Silver"],
                correct: 2
            },
            {
                question: "What is the capital of Italy?",
                answers: ["Venice", "Rome", "Florence", "Milan"],
                correct: 1
            },
            {
                question: "Which country is known as the Land of the Rising Sun?",
                answers: ["China", "Korea", "Japan", "Thailand"],
                correct: 2
            },
            {
                question: "What is the largest land animal?",
                answers: ["Giraffe", "Rhino", "Elephant", "Horse"],
                correct: 2
            },
            {
                question: "Which planet is known for its rings?",
                answers: ["Jupiter", "Mars", "Uranus", "Saturn"],
                correct: 3
            },
            {
                question: "How many letters are in the English alphabet?",
                answers: ["24", "25", "26", "27"],
                correct: 2
            },
            {
                question: "What is the largest country by area?",
                answers: ["China", "Canada", "Russia", "USA"],
                correct: 2
            },
            {
                question: "What is the smallest prime number?",
                answers: ["1", "2", "3", "5"],
                correct: 1
            },
            {
                question: "Which is the fastest land animal?",
                answers: ["Cheetah", "Lion", "Tiger", "Leopard"],
                correct: 0
            },
            {
                question: "What gas do plants absorb from the atmosphere?",
                answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
                correct: 1
            },
            {
                question: "Which ocean is the smallest?",
                answers: ["Indian Ocean", "Arctic Ocean", "Atlantic Ocean", "Pacific Ocean"],
                correct: 1
            },
            {
                question: "Which country is Paris the capital of?",
                answers: ["Germany", "Spain", "France", "Italy"],
                correct: 2
            },
            {
                question: "How many planets are in our solar system?",
                answers: ["7", "8", "9", "10"],
                correct: 1
            },
            {
                question: "What is the chemical symbol for gold?",
                answers: ["Au", "Ag", "Gd", "Pt"],
                correct: 0
            },
            {
                question: "What is the main ingredient in guacamole?",
                answers: ["Tomato", "Avocado", "Onion", "Pepper"],
                correct: 1
            },
            {
                question: "Which animal is known as the King of the Jungle?",
                answers: ["Elephant", "Tiger", "Lion", "Bear"],
                correct: 2
            },
            {
                question: "What is the currency of Japan?",
                answers: ["Won", "Dollar", "Rupee", "Yen"],
                correct: 3
            },
            {
                question: "Which element has the atomic number 1?",
                answers: ["Helium", "Oxygen", "Hydrogen", "Carbon"],
                correct: 2
            },
            {
                question: "How many days are there in a leap year?",
                answers: ["365", "366", "367", "368"],
                correct: 1
            },
            {
                question: "Which month comes after October?",
                answers: ["September", "November", "December", "January"],
                correct: 1
            },
            {
                question: "Which planet is known as the Blue Planet?",
                answers: ["Earth", "Neptune", "Uranus", "Venus"],
                correct: 0
            },
            {
                question: "What is the main ingredient in bread?",
                answers: ["Sugar", "Salt", "Flour", "Eggs"],
                correct: 2
            },
            {
                question: "How many players are there in a soccer team?",
                answers: ["9", "10", "11", "12"],
                correct: 2
            },
            {
                question: "Who discovered America?",
                answers: ["Christopher Columbus", "Vasco da Gama", "Ferdinand Magellan", "Marco Polo"],
                correct: 0
            },
            {
                question: "Which fruit is known as the king of fruits?",
                answers: ["Apple", "Mango", "Banana", "Pineapple"],
                correct: 1
            },
            {
                question: "What is the capital of Germany?",
                answers: ["Berlin", "Munich", "Hamburg", "Frankfurt"],
                correct: 0
            },
            {
                question: "Which planet is known for its Great Red Spot?",
                answers: ["Mars", "Jupiter", "Saturn", "Neptune"],
                correct: 1
            },
            {
                question: "How many continents does the equator pass through?",
                answers: ["1", "2", "3", "4"],
                correct: 2
            },
            {
                question: "Which planet has the most moons?",
                answers: ["Earth", "Jupiter", "Saturn", "Mars"],
                correct: 1
            },
            {
                question: "What is the chemical symbol for sodium?",
                answers: ["S", "So", "Na", "N"],
                correct: 2
            },
            {
                question: "Which is the smallest bone in the human body?",
                answers: ["Femur", "Stapes", "Ulna", "Fibula"],
                correct: 1
            },
            {
                question: "What is the capital of Spain?",
                answers: ["Madrid", "Barcelona", "Seville", "Valencia"],
                correct: 0
            },
            {
                question: "Which organ pumps blood throughout the body?",
                answers: ["Lungs", "Brain", "Kidney", "Heart"],
                correct: 3
            },
            {
                question: "What is the largest desert in the world?",
                answers: ["Sahara", "Gobi", "Kalahari", "Arabian"],
                correct: 0
            },
            {
                question: "How many teeth does an adult human have?",
                answers: ["28", "30", "32", "34"],
                correct: 2
            },
            {
                question: "Which is the longest river in the world?",
                answers: ["Amazon", "Nile", "Yangtze", "Mississippi"],
                correct: 1
            },
            {
                question: "What is the capital of Australia?",
                answers: ["Sydney", "Melbourne", "Brisbane", "Canberra"],
                correct: 3
            },
            {
                question: "Which country is known for the Eiffel Tower?",
                answers: ["Spain", "Italy", "France", "Germany"],
                correct: 2
            },
            {
                question: "Which element is known as the building block of life?",
                answers: ["Oxygen", "Carbon", "Hydrogen", "Nitrogen"],
                correct: 1
            },
            {
                question: "How many planets have rings?",
                answers: ["1", "2", "3", "4"],
                correct: 3
            },
            {
                question: "Which continent is the largest by area?",
                answers: ["Africa", "Asia", "North America", "Europe"],
                correct: 1
            },
            {
                question: "What is the main ingredient in sushi?",
                answers: ["Noodles", "Rice", "Bread", "Potatoes"],
                correct: 1
            },
            {
                question: "Which bird is the largest?",
                answers: ["Eagle", "Ostrich", "Penguin", "Albatross"],
                correct: 1
            },
            {
                question: "What is the largest internal organ in the human body?",
                answers: ["Heart", "Brain", "Liver", "Lung"],
                correct: 2
            },
            {
                question: "Which planet is known as the Earth's twin?",
                answers: ["Mars", "Venus", "Mercury", "Neptune"],
                correct: 1
            },
            {
                question: "What is the boiling point of water?",
                answers: ["90°C", "95°C", "100°C", "105°C"],
                correct: 2
            },
            {
                question: "Which country is famous for its pyramids?",
                answers: ["Mexico", "Egypt", "Peru", "India"],
                correct: 1
            },
            {
                question: "What is the capital of the USA?",
                answers: ["New York", "Los Angeles", "Chicago", "Washington D.C."],
                correct: 3
            },
            {
                question: "What is the longest bone in the human body?",
                answers: ["Humerus", "Tibia", "Femur", "Radius"],
                correct: 2
            },
            {
                question: "Which planet is known as the Morning Star?",
                answers: ["Mars", "Venus", "Jupiter", "Saturn"],
                correct: 1
            },
            {
                question: "Which ocean is Bermuda in?",
                answers: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
                correct: 1
            },
            {
                question: "Which gas is most abundant in Earth's atmosphere?",
                answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
                correct: 2
            },
            {
                question: "How many bones are in the human body?",
                answers: ["204", "206", "208", "210"],
                correct: 1
            },
            {
                question: "What is the smallest unit of life?",
                answers: ["Atom", "Molecule", "Cell", "Organ"],
                correct: 2
            },
            {
                question: "Which is the hottest planet in our solar system?",
                answers: ["Mercury", "Venus", "Mars", "Jupiter"],
                correct: 1
            },
            {
                question: "Which is the largest fish?",
                answers: ["Shark", "Whale Shark", "Dolphin", "Blue Whale"],
                correct: 1
            },
            {
                question: "Which city is known as the Big Apple?",
                answers: ["Los Angeles", "San Francisco", "Chicago", "New York"],
                correct: 3
            },
            {
                question: "Which element is in diamonds?",
                answers: ["Carbon", "Oxygen", "Hydrogen", "Nitrogen"],
                correct: 0
            },
            {
                question: "What is the capital of Canada?",
                answers: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
                correct: 2
            },
            {
                question: "What is the smallest country in the world?",
                answers: ["Monaco", "Liechtenstein", "San Marino", "Vatican City"],
                correct: 3
            },
            {
                question: "Which planet is known as the gas giant?",
                answers: ["Mars", "Saturn", "Jupiter", "Neptune"],
                correct: 2
            },
            {
                question: "How many hearts does an octopus have?",
                answers: ["1", "2", "3", "4"],
                correct: 2
            },
            {
                question: "Which country is famous for pasta?",
                answers: ["Spain", "Greece", "Italy", "France"],
                correct: 2
            },
            {
                question: "Which planet is the smallest in the solar system?",
                answers: ["Mercury", "Mars", "Earth", "Neptune"],
                correct: 0
            },
            {
                question: "Which is the largest island in the world?",
                answers: ["Australia", "Greenland", "Borneo", "New Guinea"],
                correct: 1
            },
            {
                question: "What is the main language spoken in Brazil?",
                answers: ["Spanish", "Portuguese", "French", "Italian"],
                correct: 1
            },
            {
                question: "Which country is the Taj Mahal in?",
                answers: ["Pakistan", "Bangladesh", "India", "Nepal"],
                correct: 2
            },
            {
                question: "Which color is a symbol of peace?",
                answers: ["Blue", "Green", "White", "Red"],
                correct: 2
            },
            {
                question: "What is the capital of Russia?",
                answers: ["Moscow", "St. Petersburg", "Kazan", "Novosibirsk"],
                correct: 0
            },
            {
                question: "What is the currency of the UK?",
                answers: ["Euro", "Dollar", "Pound", "Franc"],
                correct: 2
            },
            {
                question: "Which continent is known as the Dark Continent?",
                answers: ["Asia", "Africa", "Europe", "South America"],
                correct: 1
            },
            {
                question: "Which planet has a day longer than its year?",
                answers: ["Mars", "Venus", "Mercury", "Saturn"],
                correct: 1
            },
            {
                question: "Which is the most populous country in the world?",
                answers: ["India", "USA", "China", "Russia"],
                correct: 2
            }
    ];

    const mediumQuestions = [
        {
            question: "What is the smallest country in Asia by area?",
            answers: ["Bhutan", "Maldives", "Sri Lanka", "Singapore"],
            correct: 3
        },
        {
            question: "What is the hardest rock?",
            answers: ["Granite", "Basalt", "Diamond", "Marble"],
            correct: 2
        },
        {
            question: "Who wrote the novel '1984'?",
            answers: ["Aldous Huxley", "George Orwell", "J.D. Salinger", "Ray Bradbury"],
            correct: 1
        },
        {
            question: "Which gas is used in electric bulbs?",
            answers: ["Oxygen", "Hydrogen", "Nitrogen", "Argon"],
            correct: 3
        },
        {
            question: "What is the chemical formula for table salt?",
            answers: ["NaCl", "KCl", "CaCl2", "MgCl2"],
            correct: 0
        },
        {
            question: "Which planet has the largest volcano in our solar system?",
            answers: ["Earth", "Venus", "Mars", "Jupiter"],
            correct: 2
        },
        {
            question: "Which blood group is known as the universal donor?",
            answers: ["A", "B", "O", "AB"],
            correct: 2
        },
        {
            question: "Which famous ship sank in 1912?",
            answers: ["Lusitania", "Bismarck", "Titanic", "Queen Mary"],
            correct: 2
        },
        {
            question: "What is the main ingredient in hummus?",
            answers: ["Lentils", "Chickpeas", "Kidney Beans", "Peas"],
            correct: 1
        },
        {
            question: "Which element has the highest melting point?",
            answers: ["Carbon", "Tungsten", "Iron", "Gold"],
            correct: 1
        },
        {
            question: "Which country is the largest producer of coffee?",
            answers: ["Vietnam", "Colombia", "Brazil", "Ethiopia"],
            correct: 2
        },
        {
            question: "What is the largest moon of Saturn?",
            answers: ["Titan", "Europa", "Ganymede", "Callisto"],
            correct: 0
        },
        {
            question: "Which language has the most native speakers?",
            answers: ["English", "Spanish", "Mandarin", "Hindi"],
            correct: 2
        },
        {
            question: "Which is the second most abundant element in Earth's crust?",
            answers: ["Aluminum", "Iron", "Oxygen", "Silicon"],
            correct: 3
        },
        {
            question: "Which vitamin is produced when a person is exposed to sunlight?",
            answers: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
            correct: 3
        },
        {
            question: "What is the longest river in Asia?",
            answers: ["Ganges", "Yangtze", "Mekong", "Indus"],
            correct: 1
        },
        {
            question: "Which war was fought between the North and South regions in the United States?",
            answers: ["World War I", "Civil War", "Revolutionary War", "War of 1812"],
            correct: 1
        },
        {
            question: "Which organ is affected by hepatitis?",
            answers: ["Heart", "Liver", "Kidneys", "Lungs"],
            correct: 1
        },
        {
            question: "Which country has the most islands?",
            answers: ["Indonesia", "Norway", "Philippines", "Sweden"],
            correct: 3
        },
        {
            question: "Which metal is liquid at room temperature?",
            answers: ["Mercury", "Gallium", "Lead", "Zinc"],
            correct: 0
        },
        {
            question: "Which planet rotates on its side?",
            answers: ["Mars", "Neptune", "Uranus", "Venus"],
            correct: 2
        },
        {
            question: "Which Shakespeare play features the characters Rosencrantz and Guildenstern?",
            answers: ["Macbeth", "Hamlet", "Othello", "King Lear"],
            correct: 1
        },
        {
            question: "Who is known as the 'Father of Computers'?",
            answers: ["Alan Turing", "Charles Babbage", "John von Neumann", "Blaise Pascal"],
            correct: 1
        },
        {
            question: "Which organ is responsible for producing insulin?",
            answers: ["Heart", "Liver", "Pancreas", "Kidney"],
            correct: 2
        },
        {
            question: "Which country gifted the Statue of Liberty to the United States?",
            answers: ["Germany", "France", "Italy", "Spain"],
            correct: 1
        },
        {
            question: "What is the highest mountain in Africa?",
            answers: ["Mount Kenya", "Mount Kilimanjaro", "Atlas Mountains", "Drakensberg"],
            correct: 1
        },
        {
            question: "Which composer wrote the 'Moonlight Sonata'?",
            answers: ["Mozart", "Bach", "Beethoven", "Tchaikovsky"],
            correct: 2
        },
        {
            question: "Which element is used in batteries?",
            answers: ["Lithium", "Magnesium", "Zinc", "Copper"],
            correct: 0
        },
        {
            question: "Which country has the most time zones?",
            answers: ["USA", "Russia", "Canada", "France"],
            correct: 3
        },
        {
            question: "Which explorer is credited with discovering the New World?",
            answers: ["Leif Erikson", "Marco Polo", "Christopher Columbus", "Ferdinand Magellan"],
            correct: 2
        },
        {
            question: "Which bird is a universal symbol of peace?",
            answers: ["Crow", "Sparrow", "Dove", "Peacock"],
            correct: 2
        },
        {
            question: "Which country is known as the Land of the Midnight Sun?",
            answers: ["Norway", "Sweden", "Finland", "Iceland"],
            correct: 0
        },
        {
            question: "What is the primary ingredient in chocolate?",
            answers: ["Cocoa Beans", "Milk", "Sugar", "Vanilla"],
            correct: 0
        },
        {
            question: "Which European city is known as the 'City of Canals'?",
            answers: ["Paris", "Venice", "Amsterdam", "Bruges"],
            correct: 1
        },
        {
            question: "Which organ in the human body is affected by pneumonia?",
            answers: ["Heart", "Lungs", "Liver", "Kidneys"],
            correct: 1
        },
        {
            question: "Which is the only mammal capable of true flight?",
            answers: ["Bat", "Flying Squirrel", "Sugar Glider", "Flying Lemur"],
            correct: 0
        },
        {
            question: "Which gas is essential for respiration?",
            answers: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Helium"],
            correct: 1
        },
        {
            question: "Which mountain range separates Europe and Asia?",
            answers: ["Alps", "Rockies", "Himalayas", "Ural Mountains"],
            correct: 3
        },
        {
            question: "Which planet has the shortest day?",
            answers: ["Earth", "Jupiter", "Mars", "Venus"],
            correct: 1
        },
        {
            question: "Which artist painted the ceiling of the Sistine Chapel?",
            answers: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"],
            correct: 1
        },
        {
            question: "Which country is home to the kangaroo?",
            answers: ["New Zealand", "Australia", "Papua New Guinea", "South Africa"],
            correct: 1
        },
        {
            question: "Which fruit has its seeds on the outside?",
            answers: ["Apple", "Orange", "Strawberry", "Pineapple"],
            correct: 2
        },
        {
            question: "Which is the closest star to Earth?",
            answers: ["Proxima Centauri", "Alpha Centauri", "Betelgeuse", "Sun"],
            correct: 3
        },
        {
            question: "What is the name of the Earth's natural satellite?",
            answers: ["Mars", "Moon", "Europa", "Phobos"],
            correct: 1
        },
        {
            question: "Which ocean is the Bermuda Triangle located in?",
            answers: ["Atlantic", "Pacific", "Indian", "Southern"],
            correct: 0
        },
        {
            question: "Which animal is known as the 'Ship of the Desert'?",
            answers: ["Elephant", "Camel", "Horse", "Donkey"],
            correct: 1
        },
        {
            question: "Which vitamin is also known as ascorbic acid?",
            answers: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
            correct: 2
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: ["Mercury", "Mars", "Venus", "Jupiter"],
            correct: 1
        },
        {
            question: "Which is the oldest written language still in use?",
            answers: ["Latin", "Sanskrit", "Chinese", "Hebrew"],
            correct: 2
        },
        {
            question: "Which country is the largest producer of gold?",
            answers: ["USA", "Australia", "Russia", "China"],
            correct: 3
        },
        {
            question: "Which is the highest waterfall in the world?",
            answers: ["Niagara Falls", "Angel Falls", "Victoria Falls", "Yosemite Falls"],
            correct: 1
        },
        {
            question: "Which vitamin helps in blood clotting?",
            answers: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"],
            correct: 3
        },
        {
            question: "Which is the longest bone in the human body?",
            answers: ["Femur", "Tibia", "Humerus", "Radius"],
            correct: 0
        },
        {
            question: "Which is the most spoken language in South America?",
            answers: ["English", "Spanish", "Portuguese", "French"],
            correct: 1
        },
        {
            question: "Which planet is the hottest in the solar system?",
            answers: ["Mercury", "Venus", "Mars", "Jupiter"],
            correct: 1
        },
        {
            question: "Which organ purifies blood in the human body?",
            answers: ["Lungs", "Liver", "Kidneys", "Heart"],
            correct: 2
        },
        {
            question: "Which is the largest desert in Africa?",
            answers: ["Kalahari", "Namib", "Sahara", "Libyan"],
            correct: 2
        },
        {
            question: "Which is the largest freshwater lake in the world?",
            answers: ["Lake Baikal", "Lake Superior", "Caspian Sea", "Lake Victoria"],
            correct: 2
        },
        {
            question: "Which part of the plant conducts photosynthesis?",
            answers: ["Roots", "Stem", "Leaves", "Flowers"],
            correct: 2
        },
        {
            question: "Which vitamin is known as the sunshine vitamin?",
            answers: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E"],
            correct: 2
        },
        {
            question: "Which continent is the largest?",
            answers: ["Asia", "Africa", "North America", "Europe"],
            correct: 0
        },
        {
            question: "Which animal is known for its ability to change colors?",
            answers: ["Octopus", "Chameleon", "Cuttlefish", "Squid"],
            correct: 1
        },
        {
            question: "Which is the tallest building in the world?",
            answers: ["Shanghai Tower", "Burj Khalifa", "One World Trade Center", "Petronas Towers"],
            correct: 1
        },
        {
            question: "Which gas is commonly known as laughing gas?",
            answers: ["Carbon Dioxide", "Nitrous Oxide", "Methane", "Oxygen"],
            correct: 1
        },
        {
            question: "Which is the longest railway in the world?",
            answers: ["Trans-Siberian Railway", "Orient Express", "Canadian Pacific Railway", "Blue Train"],
            correct: 0
        },
        {
            question: "Which country hosted the 2016 Summer Olympics?",
            answers: ["China", "Brazil", "Russia", "Japan"],
            correct: 1
        },
        {
            question: "Which organ is affected by jaundice?",
            answers: ["Liver", "Heart", "Lungs", "Kidneys"],
            correct: 0
        },
        {
            question: "Which country is famous for its pyramids?",
            answers: ["Mexico", "India", "China", "Egypt"],
            correct: 3
        },
        {
            question: "Which is the fastest bird in the world?",
            answers: ["Eagle", "Hawk", "Falcon", "Ostrich"],
            correct: 2
        },
        {
            question: "Which continent is the smallest by land area?",
            answers: ["Asia", "Australia", "Europe", "Antarctica"],
            correct: 1
        },
        {
            question: "Which planet has the most moons?",
            answers: ["Mars", "Jupiter", "Saturn", "Neptune"],
            correct: 2
        },
        {
            question: "Which country is the largest in South America?",
            answers: ["Argentina", "Brazil", "Colombia", "Venezuela"],
            correct: 1
        },
        {
            question: "Which organ stores bile produced by the liver?",
            answers: ["Gallbladder", "Pancreas", "Stomach", "Kidney"],
            correct: 0
        }
    ];
    
    const hardQuestions = [
        {
            question: "Which NFL team won the first Super Bowl in 1967?",
            answers: ["Green Bay Packers", "Kansas City Chiefs", "Dallas Cowboys", "New York Giants"],
            correct: 0
        },
        {
            question: "In 'The Legend of Zelda: Ocarina of Time', what is the name of Link's fairy companion?",
            answers: ["Navi", "Tatl", "Midna", "Fi"],
            correct: 0
        },
        {
            question: "Which artist painted the 'Guernica'?",
            answers: ["Pablo Picasso", "Salvador Dalí", "Henri Matisse", "Vincent van Gogh"],
            correct: 0
        },
        {
            question: "Which author wrote the novel 'Infinite Jest'?",
            answers: ["David Foster Wallace", "Jonathan Franzen", "Don DeLillo", "Thomas Pynchon"],
            correct: 0
        },
        {
            question: "Which team holds the record for the most NBA championships?",
            answers: ["Boston Celtics", "Los Angeles Lakers", "Chicago Bulls", "Golden State Warriors"],
            correct: 0
        },
        {
            question: "In chess, what is the only piece that cannot move backwards?",
            answers: ["Pawn", "Knight", "Bishop", "Queen"],
            correct: 0
        },
        {
            question: "Which video game holds the record for the best-selling of all time?",
            answers: ["Minecraft", "Tetris", "Grand Theft Auto V", "Super Mario Bros."],
            correct: 0
        },
        {
            question: "Which country has won the most FIFA World Cup titles?",
            answers: ["Brazil", "Germany", "Italy", "Argentina"],
            correct: 0
        },
        {
            question: "In the TV show 'Breaking Bad', what is the street name of the drug Walter White produces?",
            answers: ["Blue Sky", "Heisenberg", "Crystal", "White Magic"],
            correct: 0
        },
        {
            question: "Which Shakespeare play features the character Shylock?",
            answers: ["The Merchant of Venice", "Othello", "Macbeth", "Hamlet"],
            correct: 0
        },
        {
            question: "Which instrument is Yo-Yo Ma famous for playing?",
            answers: ["Cello", "Violin", "Piano", "Guitar"],
            correct: 0
        },
        {
            question: "Which film won the first-ever Academy Award for Best Picture?",
            answers: ["Wings", "Sunrise", "The Jazz Singer", "Metropolis"],
            correct: 0
        },
        {
            question: "Which programming language is primarily used for Android app development?",
            answers: ["Java", "Swift", "Python", "Ruby"],
            correct: 0
        },
        {
            question: "In the game of Monopoly, which property is the most expensive?",
            answers: ["Boardwalk", "Park Place", "Pennsylvania Avenue", "Marvin Gardens"],
            correct: 0
        },
        {
            question: "Who wrote the play 'Waiting for Godot'?",
            answers: ["Samuel Beckett", "Tennessee Williams", "Arthur Miller", "Harold Pinter"],
            correct: 0
        },
        {
            question: "In which year did the Berlin Wall fall?",
            answers: ["1989", "1991", "1987", "1993"],
            correct: 0
        },
        {
            question: "Which soccer player has won the most Ballon d'Or awards?",
            answers: ["Lionel Messi", "Cristiano Ronaldo", "Michel Platini", "Johan Cruyff"],
            correct: 0
        },
        {
            question: "In 'Game of Thrones', what is the name of Arya Stark's sword?",
            answers: ["Needle", "Longclaw", "Oathkeeper", "Ice"],
            correct: 0
        },
        {
            question: "Which book starts with the line 'Call me Ishmael'?",
            answers: ["Moby-Dick", "The Great Gatsby", "1984", "The Catcher in the Rye"],
            correct: 0
        },
        {
            question: "Which band released the album 'Dark Side of the Moon'?",
            answers: ["Pink Floyd", "The Beatles", "Led Zeppelin", "The Rolling Stones"],
            correct: 0
        },
        {
            question: "Which film director is known for the 'Dollars Trilogy' of spaghetti westerns?",
            answers: ["Sergio Leone", "John Ford", "Clint Eastwood", "Sam Peckinpah"],
            correct: 0
        },
        {
            question: "In which video game do players fight against a character named 'The End'?",
            answers: ["Metal Gear Solid 3", "Halo", "Resident Evil 4", "Dark Souls"],
            correct: 0
        },
        {
            question: "Which chemical element is named after the creator of the periodic table?",
            answers: ["Mendelevium", "Curium", "Einsteinium", "Nobelium"],
            correct: 0
        },
        {
            question: "Which river flows through the Grand Canyon?",
            answers: ["Colorado River", "Mississippi River", "Rio Grande", "Columbia River"],
            correct: 0
        },
        {
            question: "Which author wrote the 'A Song of Ice and Fire' series?",
            answers: ["George R.R. Martin", "J.R.R. Tolkien", "Patrick Rothfuss", "Robert Jordan"],
            correct: 0
        },
        {
            question: "In the movie 'Inception', what object is used to distinguish dreams from reality?",
            answers: ["Spinning top", "Dice", "Watch", "Coin"],
            correct: 0
        },
        {
            question: "What is the maximum score possible in a single game of bowling?",
            answers: ["300", "350", "400", "450"],
            correct: 0
        },
        {
            question: "Which planet has the largest volcano in the solar system?",
            answers: ["Mars", "Venus", "Jupiter", "Earth"],
            correct: 0
        },
        {
            question: "Which video game series features the characters Master Chief and Cortana?",
            answers: ["Halo", "Gears of War", "Mass Effect", "Destiny"],
            correct: 0
        },
        {
            question: "In which year did the Titanic sink?",
            answers: ["1912", "1914", "1905", "1907"],
            correct: 0
        },
        {
            question: "Which musical features the song 'The Phantom of the Opera'?",
            answers: ["The Phantom of the Opera", "Les Misérables", "Cats", "Rent"],
            correct: 0
        },
        {
            question: "Which writer created the detective character Hercule Poirot?",
            answers: ["Agatha Christie", "Arthur Conan Doyle", "Raymond Chandler", "Dashiell Hammett"],
            correct: 0
        },
        {
            question: "Which artist released the album 'Thriller'?",
            answers: ["Michael Jackson", "Prince", "Madonna", "Whitney Houston"],
            correct: 0
        },
        {
            question: "Which Greek god is known as the god of the underworld?",
            answers: ["Hades", "Poseidon", "Zeus", "Apollo"],
            correct: 0
        },
        {
            question: "Which English king was defeated at the Battle of Hastings in 1066?",
            answers: ["Harold II", "William the Conqueror", "Richard III", "Henry V"],
            correct: 0
        },
        {
            question: "Which tennis player has won the most Grand Slam titles in history?",
            answers: ["Margaret Court", "Serena Williams", "Steffi Graf", "Martina Navratilova"],
            correct: 0
        },
        {
            question: "Which video game features the character Geralt of Rivia?",
            answers: ["The Witcher", "Dark Souls", "Assassin's Creed", "Dragon Age"],
            correct: 0
        },
        {
            question: "In which city is the headquarters of the United Nations located?",
            answers: ["New York City", "Geneva", "Brussels", "Vienna"],
            correct: 0
        },
        {
            question: "Which element has the chemical symbol 'Fe'?",
            answers: ["Iron", "Lead", "Silver", "Gold"],
            correct: 0
        },
        {
            question: "Which actress played the lead role in the film 'Breakfast at Tiffany's'?",
            answers: ["Audrey Hepburn", "Marilyn Monroe", "Elizabeth Taylor", "Grace Kelly"],
            correct: 0
        }
    ];

    answer1.addEventListener("click", () => {
        if (startCnt) {
            startGame();
            startCnt = false;
        } else {
            checkAnswer(0);
        }
    });
    answer2.addEventListener("click", () => {
        if (settingsCnt) {
            settingsScreen();
            settingsCnt = false;
        } else {
            checkAnswer(1);
        }
    });
    answer3.addEventListener("click", () => {
        if (detailsCnt) {
            detailsScreen();
            detailsCnt = false;
        } else {
            checkAnswer(2);
        }
    });
    answer4.addEventListener("click", () => {
        if (aboutCnt) {
            aboutScreen();
            aboutCnt = false;
        } else {
            checkAnswer(3);
        }
    });

    function startGame() {
        resetMoneyLadder();
        resetLifelines();
        shuffledQuestions = shuffleQuestions(easyQuestions);
        currentQuestion = 0;
        currentLevel = 0;
        moneyValues[0].classList.add("active");
        settingsCnt = false;
        detailsCnt = false;
        aboutCnt = false;
        updateQuestion();
    }

    function updateQuestion() {
        resetOptions();
        if (currentLevel === 5) {
            shuffledQuestions = shuffleQuestions(mediumQuestions);
        }
        if (currentLevel === 10) {
            shuffledQuestions = shuffleQuestions(hardQuestions);
        }
        const current = shuffledQuestions[currentQuestion];
        questionElement.textContent = current.question;
        answer1.textContent = current.answers[0];
        answer2.textContent = current.answers[1];
        answer3.textContent = current.answers[2];
        answer4.textContent = current.answers[3];
    }

    function checkAnswer(index) {
        
            const correctIndex = shuffledQuestions[currentQuestion].correct;
            if (index === correctIndex) {
                answerButtons[correctIndex].classList.add("correct");
                currentLevel++;
                currentQuestion++;
                if (currentLevel > 0) {
                    moneyValues[currentLevel - 1].classList.remove("active");
                    moneyValues[currentLevel - 1].classList.add("correct");
                }
                if (currentLevel < moneyValues.length) {
                    moneyValues[currentLevel].classList.add("active");
                    setTimeout(() => {
                        updateQuestion();
                    }, 2000);
                } else {
                    alert("Congratulations! You've won $1,000,000!");
                    startScreen();
                    resetLifelines();
                }
            } else {
                answerButtons[index].classList.add("incorrect");
                alert("Wrong answer! Game over.");
                setTimeout(() => {
                    resetLifelines();
                    startScreen();
                }, 2000);
                
            }
        
    }
});
