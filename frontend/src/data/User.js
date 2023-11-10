class User {
    constructor(id, name, admin_projects, session_id) {
        this.id = id;
        this.name = name;
        this.admin_projects = admin_projects;
        this.session_id = session_id;
    }

    // JSON Constructor?
}

export default User;