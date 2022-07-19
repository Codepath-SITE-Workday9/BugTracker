\echo "Delete and recreate bugtracker db?"
\prompt "Return for yes or control-C to cancel > " answer

-- DROPPING AND RECREATING THE BUGTRACKER DATABASE
DROP DATABASE bugtracker;
CREATE DATABASE bugtracker;

--CONNECTING TO THE BUGTRACKER DATABASE AND BUGTRACKER SCHEMA TABLES
\connect bugtracker
\i bugtracker-schema.sql