class People {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    eat() {
        console.log(`${this.name}eat`)
    }
    speat() {
        console.log(`${this.name}speat`)
    }
}

class Student extends People {
    constructor(name, age, number) {
        super(name, age)
        this.number = number
    }
    study() {
        this.eat()
    }
    play() {
        super.speat();
    }
}

const stu = new Student('chen', 22, 22);
stu.speat();
stu.play();