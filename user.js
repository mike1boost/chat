class User {

    constructor(name, age, password){
        this.name = name || null;
        this.age = age || null;
        this.password = password || null;
    }

    set_name(name){
        this.name = name;
    }

    set_age(age){
        this.age = age;
    }

    set_password(password){
        this.password = password;
    }

    get_name(){
        return this.name;
    }

    get_age(){
        return this.age;
    }

    get_password(){
        return this.password;
    }

}


module.exports= User;