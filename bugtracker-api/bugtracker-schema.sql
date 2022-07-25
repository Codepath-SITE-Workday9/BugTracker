-- TABLE FOR STORING USER INFORMATION
CREATE TABLE users 
(
        id              SERIAL PRIMARY KEY,
        email           TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
        full_name       TEXT NOT NULL,
        password        TEXT NOT NULL,
        created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);




--TABLE FOR STORING PROJECT INFORMATION AND TICKET ASSOCIATED WITH PROJECT
CREATE TABLE projects
(
        id              SERIAL PRIMARY KEY,
        name            TEXT NOT NULL,
        description     TEXT NOT NULL,
        image_url       TEXT NOT NULL,
        tickets         INTEGER[],
        teams           INTEGER[],
        created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
        creator_id      INTEGER NOT NULL
);





--TABLE FOR STORING TEAMS INFORMATION AND DEVELOPERS WITHIN THOSE TEAMS
CREATE TABLE teams
(
        id              SERIAL PRIMARY KEY,
        name            TEXT NOT NULL,
        members         INTEGER[],
        creator_id      INTEGER NOT NULL,
        projects        INTEGER[]
);





--TABLE FOR CREATING AND STORING COMMENTS INFORMATION ASSOCIATED WITH SPECIFIC TICKETS
CREATE TABLE comments
(
        id              SERIAL PRIMARY KEY,
        ticket_id       INTEGER NOT NULL,
        user_id         INTEGER NOT NULL,
        content         TEXT NOT NULL,
        created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);





--TABLE FOR STORING TICKET INFORMATION AND INFO ASSOCIATED WITH THE DEVELOPERS, COMMENTS, PROJECTS ETC.
CREATE TABLE tickets
(
        id              SERIAL PRIMARY KEY,
        creator_id      INTEGER NOT NULL,
        developers      INTEGER[],
        comments        INTEGER[],
        project_id      INTEGER NOT NULL,
        title           TEXT NOT NULL,
        description     TEXT NOT NULL,
        category        TEXT NOT NULL,
        priority        TEXT NOT NULL,
        status          TEXT NOT NULL,
        complexity      INTEGER NOT NULL,
        created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
        created_by      INTEGER NOT NULL,
        closed_at       TIMESTAMP DEFAULT NOW(),
        closed_by       INTEGER NOT NULL DEFAULT 0
);

