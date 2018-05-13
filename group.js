const Users = require('./users');

class Group {
    constructor(name, parent){
        this.name = name || null;
        this.users = new Users() || null;
        this.parent = parent || null;
        this.childrens = [] || null;
        this.user_count = 0;
    }

    getName(){return this.name}
    getUsersArray(){return this.users.get_users()}
    getUsersClass(){return this.users}
    getParent(){return this.parent}
    getChildrens(){return this.childrens}
    getCount(){return this.user_count}

    setChildrens(child){
        this.childrens.push(child);
    }

    updateCount(group, number){
        if(group) {
            group.user_count = group.user_count - number;
            this.updateCount(group.parent, number);
        }
    }
    updateUsersCount_add(group){
        if(group) {
            group.user_count = group.user_count + 1;
            this.updateUsersCount_add(group.parent)
        }
    }
    updateUsersCount_delete(group){
        if(group) {
            group.user_count = group.user_count - 1;
            this.updateUsersCount_delete(group.parent)
        }
    }

    deleteChild(group, childName){
        for (var i = 0; i < group.childrens.length; i++) {
            if(group.childrens[i].name === childName){
                group.childrens.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    searchAndGetPath(root, name){
        var path = [];
        var path2print = [];
        var printPath = null;
        this.findInstances(root, name, path);
        for (var i = 0; i < path.length; i++){
            path2print = this.buildPath(path[i]);
            if(path2print.length > 1) {
                printPath = path2print[0].name + "->";
                for (var j = 1; j < path2print.length - 1; j++) {
                    printPath += path2print[j].name + "->";
                }
                printPath+= path2print[path2print.length-1].name;
            }
            else printPath = path2print[0].name;
            console.log(printPath);
        }
    }

    findInstances(root, groupName, path){
        if(root.name === groupName) {
            path.push(root);
        }
        if (root.childrens[0] === undefined) return;

        for (var i = 0; i < root.childrens.length; i++){
            this.findInstances(root.childrens[i], groupName, path);
        }
    }

    findInstances_By_user(root, userName, path){
        if(root.findUser(userName) != undefined) {
            path.push(root);
        }
        if (root.childrens[0] === undefined) return;

        for (var i = 0; i < root.childrens.length; i++){
            this.findInstances_By_user(root.childrens[i], userName, path);
        }
    }
    buildPath(element){
        var path = [];
        if(!element.parent) {
            path.push(element);
            return path;
        }
        path = this.buildPath(element.parent);
        path.push(element);
        return path;
    }
    addUser(user){
            this.users.add_user(user);
    }
    findUser(name){
        // var user = this.users.filter(user => user.name == name);
        // return user[0];
        return this.users.find_user(name)
    }

}

module.exports= Group;

