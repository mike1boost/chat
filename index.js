const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const Groups = require('./groups');
// const Group = require('./group');
const Users = require('./users');
const User = require('./user');

//init
var users = new Users();
var groups = new Groups();

//start function
rootMain();

function rootMain() {
    console.log(" ");
    console.log("root Main\n" +
        "Type 1 for users\n" +
        "Type 2 for Groups\n" +
        "Type 3 for adding/removing users from a group\n" +
        "Type any different key to exit chat");
    rl.question('Your command? ', answer => {
        switch (answer) {
            case '1':
                userMain();
                break;
            case '2':
                groupMain();
                break;
            case '3':
                user2groupMain();
                break;
            default:
                console.log("Exit chat good day");
                process.exit(0);
                break;
        }
    });
}


function userMain() {
    console.log(" ");
    console.log("user Main\n" +
        "Type 1 for create user\n" +
        "Type 2 for delete user\n" +
        "Type 3 print users\n" +
        "Type 4 update user details (age & password");
    rl.question('Your command? ', answer => {
        switch (answer) {
            case '1':
                addUser();
                break;
            case '2':
                deleteUser();
                break;
            case '3':
                getUsers();
                break;
            case '4':
                updateUser();
                break;
            default:
                console.log("You have typed wrong answer");
                rootMain();
                break;
        }
    });
}

function groupMain() {
    console.log(" ");
    console.log("group Main\n" +
        "Type 1 for add group\n" +
        "Type 2 for delete group\n" +
        "Type 3 print groups");
    rl.question('Your command? ', answer => {
        switch (answer) {
            case '1':
                addGroup();
                break;
            case '2':
                deleteGroup();
                break;
            case '3':
                printGroups();
                break;
            default:
                console.log("You have typed wrong answer");
                rootMain();
                break;
        }
    });
}

function user2groupMain() {
    console.log(" ");
    console.log("user2group Main\n" +
        "Type 1 for add user to group\n" +
        "Type 2 for remove user from group\n" +
        "Type 3 print groups user active\n" +
        "Type 4 flatting group \n" +
        "Type 5 print groups and users (full tree)");
    rl.question('Your command? ', answer => {
        switch (answer) {
            case '1':
                adduser2group();
                break;
            case '2':
                delete_user_from_group();
                break;
            case '3':
                get_user2group();
                break;
            case '4':
                flattingGroup();
                break;
            case '5':
                printTree();
                break;
            default:
                console.log("You have typed wrong answer");
                rootMain();
                break;
        }
    });
}


//////////////////////////  user2groupMain functions  ///////////////////////////////
function adduser2group() {
    rl.question('Enter user name: ', userName => {
        rl.question('Enter group name: ', groupName => {
            var user = users.find_user(userName);
            var groups_SameName = groups.findGroups(groupName);
            if(!groups_SameName || user === undefined){
                console.log("  ");
                console.log("The group or user isn't exist");
                console.log("operation of adding user to group is canceled");
                rootMain();
            }
            var arGroups = groups.can_have_children(groups_SameName);
            groups.printPath(arGroups);
            rl.question('Type number to choose path: ', pathIndex => {
                //// add user  /////
                if(pathIndex < arGroups.length && pathIndex >= 0)
                    groups.addUser(user, arGroups[pathIndex]);
                rootMain();
            });
        });
    });
}

function delete_user_from_group() {
    rl.question('Enter user name (delete from group): ', userName => {
        rl.question('Enter group name: ', groupName => {
            var groups_SameName = groups.findGroups(groupName);
            if(!groups_SameName){
                console.log("  ");
                console.log("The group you trying to find isn't exist");
                console.log("operation of delete user from group is canceled");
                rootMain();
            }
            var arGroups = groups.can_have_children(groups_SameName);
            groups.printPath(arGroups);
            console.log("  ");
            rl.question('Type number to choose path: ', pathIndex => {
                if(pathIndex < arGroups.length && pathIndex >= 0) {
                    var group = arGroups[pathIndex];
                    var users_ = group.getUsersClass();
                    //// delete user from group  /////
                    users_.remove_user(userName);
                    group.setCount(false);
                }
                rootMain();
            });
        });
    });
}

function get_user2group() {
    rl.question('Enter user name: ', userName => {
        var user = users.find_user(userName);
        if(user === undefined){
            console.log("user not exist");
            rootMain();
        }
        else {
            groups.findGroups_userActive(userName);
            rootMain();
        }
    });
}

function flattingGroup() {
    rl.question('Enter user name: ', userName => {
        var groups = groups.findGroups(userName);
        // if(user === group){
        //     console.log("user not exist");
        //     rootMain();
        // }
        // else {
        //     groups.findGroups_userActive(userName);
        groups.flatting(groups[0]);
        rootMain();
        // }
    });
}

function printTree(){
    console.log(" ");
    groups.print_groups_Users();
    rootMain();
}




//////////////////////////  group functions  ///////////////////////////////
function addGroup() {
    console.log("  ");
    rl.question('Enter new group name: ', newGroupName => {
        rl.question('Enter group name, where you want to add: ', fatherGroupName => {
            var groups_SameName = groups.findGroups(fatherGroupName);
            if(!groups_SameName){
                console.log("  ");
                console.log("The group you trying to add new group isn't exist");
                console.log("operation of adding new group is canceled");
                rootMain();
            }
            groups.printPath(groups_SameName);
            console.log("  ");
            rl.question('Type number to choose path: ', pathIndex => {
                    //// add group  /////
                if(pathIndex < groups_SameName.length && pathIndex >= 0)
                    groups.addGroup(newGroupName, groups_SameName[pathIndex]);
                rootMain();
            });
        });
    });
}

function deleteGroup() {
    console.log("  ");
    rl.question('Enter name(group to delete): ', groupName => {
        var groups_SameName = groups.findGroups(groupName);
        if(!groups_SameName){
            console.log("  ");
            console.log("The group you trying to delete isn't exist");
            console.log("operation of delete group is canceled");
            rootMain();
        }
        else {
            groups.printPath(groups_SameName);
            console.log("  ");
            rl.question('Type number to choose path: ', pathIndex => {
                ////  delete group ////
                if(pathIndex < groups_SameName.length && pathIndex >= 0)
                    groups.removeGroup(groups_SameName[pathIndex]);
                rootMain();
            });
        }
    });
}

function printGroups() {
    console.log("  ");
    rl.question('Enter group name: ', groupName => {
        groups.searchGroupsAnd_print(groupName);
        rootMain();
    });
}

//////////////////////////  user functions  ///////////////////////////////
function addUser() {
    rl.question('Enter user name: ', name => {
        rl.question('Enter age: ', age => {
            rl.question('Enter password: ', password => {
                users.add_user( new User(name, age, password));
                rootMain();
            });
        });
    });
}

function deleteUser() {
    rl.question('Enter user name(user to delete): ', name => {
        users.remove_user(name);
        // groups.getGroups().forEach(function(group) {
        //     group.getUsersClass().remove_user(name);
        // });
        rootMain();
    });
}

function getUsers() {
    console.log(users.get_users());
    rootMain();
}

function updateUser(){
    rl.question('Enter user name you want to update: ', name => {
        rl.question('Enter new age: ', age => {
            rl.question('Enter new password: ', password => {
                var user = users.find_user(name);
                user.set_age(age);
                user.set_password(password);
                rootMain();
            });
        });
    });
}
