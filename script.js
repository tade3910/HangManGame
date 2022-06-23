
    class game{
        constructor(){
            this.wordBank = ["apple","baboon","gabby"];
            this.index = Math.floor(Math.random () * (this.wordBank.length));
            this.randomWord = this.wordBank[this.index];
            console.log(this.randomWord);
            this.dashes = "";
            this.correctGuessed = [0];
            this.lives = Number(document.querySelector("#lives").textContent);
            this.answer = document.querySelector("#correctAnswer");
        }

         guess(button){
    
            let letter = button.textContent;
            if(this.lives > 0){
                if(this.randomWord.includes(letter)){
                    button.disabled = true;
                    button.classList.add("correct");
                    this.correctGuessed.push(letter);
                    let passed = ""
                    this.correctGuessed[0] = 0;
                    passed = this.replacer(passed, 0);
                    blanks.textContent = passed;
                }
                else{
                    let error = 11 - this.lives;
                    let ErrorNo = "#Error" + error;
                    document.querySelector(ErrorNo).classList.remove("invisible");
                    this.lives--;
                    document.querySelector("#lives").textContent = this.lives;
                    button.disabled = true;
                }
            }
            if(this.lives < 1){
                let text = "The correct answer was ";
                text += this.randomWord;
                this.answer.textContent = text;
            }
            if(this.correctGuessed[0] == this.randomWord.length){
                this.lives = 0;
                this.answer.textContent = "You got it right!";
            }
            console.log(this.correctGuessed);
            
        }

        replacer(word,index){
            if(index == this.randomWord.length){
                return "";
            }
            else if(this.correctGuessed.includes(this.randomWord.charAt(index))){
                word = this.randomWord.charAt(index);
                word+= " "
                index++;
                 this.correctGuessed[0]++;       
                return word + this.replacer(word, index );
            }
            else{
                word = "_ ";
                index++;
                return word + this.replacer(word, index)
                }
            }
        starter (){
            const blanks = document.querySelector("#blanks");
            for(let i = 0; i < this.randomWord.length; i++){
                this.dashes += "_ ";
            }
            blanks.textContent = this.dashes;
        }
        reseter(){
            for(let i = this.lives; i < 10 ; i++){
                let Error = 10 - i;
                 let ErrorNo = "#Error" + Error;
                 document.querySelector(ErrorNo).classList.add("invisible");
            }
            document.querySelector("#lives").textContent = 10;
            this.answer.textContent = "";
            this.starter();
        }
    }
    
    let hangMan = new game;
    hangMan.starter();

    const buttons = document.querySelectorAll("#keyboard_wrapper button");
    for (button of buttons){
            button.addEventListener("click",guess);
        }
    const resetButton = document.querySelector("#reset");
    resetButton.addEventListener("click", reseter);

    function reseter(){
        for(button of buttons){
            button.disabled = false;
        }
        hangMan.reseter();
        hangMan = new game;
    }
    function guess(){
        hangMan.guess(this);
    }
    
    
    
   

