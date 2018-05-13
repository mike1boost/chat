const Group = require('./group');

class Groups {
    constructor(){
        this.rootGroup = new Group("Manager");
        this.init_tree();
    }

    addGroup(newGroup_name, fatherGroup){
        if (!this.unique_group(fatherGroup, newGroup_name))
            return false;
        else
            if(fatherGroup.getUsersArray().length > 0){
                return false;
        }
            var child = new Group(newGroup_name, fatherGroup);
            fatherGroup.setChildrens(child);
        return true;
    }

    removeGroup(group2delete){
    var fatherGroup = group2delete.getParent();
        var child_deleted = this.rootGroup.deleteChild(fatherGroup, group2delete.getName());
        if(child_deleted){
            console.log("group deleted");
        }
    }
    searchGroupsAnd_print(name){
        this.rootGroup.searchAndGetPath(this.rootGroup, name);
    }

    findGroups(name){
        var path = [];
        this.rootGroup.findInstances(this.rootGroup, name, path);
        return (path[0] === undefined ? false : path);
    }

    printPath(groupsArr){
        var path2print = [];
        var printPath = null;

        for (var i = 0; i < groupsArr.length; i++){
            path2print = this.rootGroup.buildPath(groupsArr[i]);
            if(path2print.length > 1) {
                printPath = path2print[0].name + "->";
                for (var j = 1; j < path2print.length - 1; j++) {
                    printPath += path2print[j].name + "->";
                }
                printPath+= path2print[path2print.length-1].name;
            }
            else printPath = path2print[0].name;
            console.log("type " + i + " for: " + printPath);
        }
    }

    unique_group(group, name) {
        var children = [];
        children = group.getChildrens();

        for (var i = 0; i < children.length; i++) {
            if (children[i].name === name) {
                return false;
            }
        }
        return true;
    }

    can_have_children(groups) {
        var groups_ = [];
        for (var i = 0; i < groups.length; i++) {
            if (!groups[i].childrens[0]) {
                groups_.push(groups[i]);
            }
        }
        return groups_;
    }

    addUser(user_, group){
        var groupUsers = group.users.get_users();
        var userExist = false;
        for (var i = 0; i < groupUsers.length; i++){
            if(groupUsers[i].name === user_.name) {
                userExist = true;
            }
        }
        if(userExist) {
            console.log("user exist ");
        }
        else {
            group.users.get_users().push(user_);
            group.updateUsersCount_add(group);
        }
    }

    findGroups_userActive(userName){
        var path = [];
        this.rootGroup.findInstances_By_user(this.rootGroup, userName, path);
        console.log(path);
    }

    flatting(group){
        if (group.parent.getChildrens().length === 1 && group.parent){
            if(group.getUsersArray().length > 0){
                var parent = group.parent;
                for (var i = 0; i < group.getUsersArray().length; i++)
                        this.addUser(group.getUsersArray()[i], parent);
                this.removeGroup(group);
            }
        }
    }


    init_tree(){
        this.rootGroup.childrens[0] = new Group('B', this.rootGroup);
        this.rootGroup.childrens[1] = new Group('C', this.rootGroup);
        this.rootGroup.childrens[2] = new Group('D', this.rootGroup);
        this.rootGroup.childrens[0].childrens[0] = new Group('E', this.rootGroup.childrens[0]);
        this.rootGroup.childrens[0].childrens[1] = new Group('F', this.rootGroup.childrens[0]);
        this.rootGroup.childrens[2].childrens[0] = new Group('G', this.rootGroup.childrens[2]);
        this.rootGroup.childrens[2].childrens[1] = new Group('H', this.rootGroup.childrens[2]);
        this.rootGroup.childrens[2].childrens[2] = new Group('I', this.rootGroup.childrens[2]);
        this.rootGroup.childrens[2].childrens[3] = new Group('J', this.rootGroup.childrens[2]);
        this.rootGroup.childrens[2].childrens[3].childrens[0] = new Group('Q', this.rootGroup.childrens[2].childrens[3]);
    }

    print_groups_Users() {
        this.printGroup(this.rootGroup, 0);
    }

    printGroup(currGroup, level) {
        console.log(this.helpPrint(level) + currGroup.name + " (" + currGroup.user_count +  ")");
        currGroup.getUsersArray().forEach(user => console.log(this.helpPrint(level + 1) + user.name));
        currGroup.getChildrens().forEach(group => this.printGroup(group, level + 1));
    }

    helpPrint(level) {
        var str = '';
        if (level > 0) {
            if (level > 1) {
                str += '| '.repeat(level - 1);
            }
            str += '|-';
        }
        return str
    }
}

module.exports= Groups;


