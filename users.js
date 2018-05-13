class Users {
    constructor(){
        this.users = [];
    }

    add_user(user){
        if (this.unique_user(user.name))
            this.users.push(user);
        else
            console.log("User exist");
    }

    remove_user(name){
        var userId = this.users.findIndex(function (user) {
            return  user.name === name;
        });

        if (userId === -1) return false;

        this.users.splice(userId, 1);
        return true;
    }

    find_user(name){
        var user = this.users.filter(user => user.name === name);
        return user[0];
    }

    get_users(){return this.users}

    unique_user(name){
        if(this.find_user(name) === undefined){
            return true;
        }
        return false;
    }
}

module.exports= Users;