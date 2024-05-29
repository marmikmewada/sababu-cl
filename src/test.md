Create tables such ash:

customers with columns first name, middle name, last name, category, sex, dob, marital status, hometown, nationality, phone and email;

address with columns: street, apt, city, state and zip;

spouse with columns: first name, last name, sex, dob, and nationality;

dependents with columns: name, sex, dob, relation, live together?

reference with columns: name, phone, email, sex, relation.

A customer can either have dependents and spouses or not, and every customer has a reference. And addresse table is the address of the customers, dependents, and spouse.

A customer is able to read, edit and write to their own data. They can read, write, and update their address. They are able to read, write, update and delete their spouse, dependents, and reference.

{
"first_name": "Amara",
"middle_name": "T",
"last_name": "Jaward",
"sex": "M",
"dob": "12/3/1972",
"marital_tatus": "Married",
"category": "family",
"hometown": "Herndon",
"nationality": "American",
"phone": "5714716384",
"email": "4jayamara@gmail.com",
"address": {
"street": "2401 Little Current Drive",
"apt": "302",
"city": "Herndon",
"state": "VA",
"zip": "20171"
},
"household": {
"spouse": {
"first_name": "Aminata",
"last_name": "Jaward",
"address": {
"street": "13796 Merrybrook CT",
"apt": "302",
"city": "Herndon",
"state": "VA",
"zip": "20171"
},
"dob": "12388",
"sex": "F",
"nationality": "American"
},
"dependents": [
{
"name": "Faith Smith",
"sex": "female",
"dob": "8/18/2017",
"relation": "daughter",
"live_together": "Yes"
},
{
"sex": "M",
"dob": "12/5/1980",
"relation": "Grandson",
"live_together": "Yes",
"name": "Mohamed Kamara"
}
]
},
"reference": {
"name": "Alpha M Bah",
"phone": "4713421824",
"email": "alphambah90@gmail.com",
"relation": "uncle",
"rex": "male"
},
"id": 1
},

Create table statement for the supabase app project.

create table if not exists
customers (
category text,
created_at timestamp with time zone,
dob date,
first_name text,
hometown text,
id bigint primary key generated always as identity,
last_name text,
marital_status text,
member_status text,
middle_name text,
nationality text,
user_id uuid,
updated_at timestamp with time zone,
sex text
);

create table if not exists
blogs (
blo_author text,
blo_content text,
blo_date date,
blo_img_url character varying,
blo_likes numeric,
blo_title text,
blo_views numeric,
created_at timestamp with time zone,
emp_id double precision,
id bigint primary key generated always as identity,
updated_at timestamp with time zone
);

create table if not exists
contacts (
apt text,
city text,
created_at timestamp without time zone,
customer_id bigint references customers (id) on delete cascade not null,
email character varying,
phone numeric,
state text,
street text,
zip numeric,
updated_at timestamp with time zone
);

create table if not exists
dependents (
apt text,
city text,
created_at timestamp without time zone,
customer_id bigint references customers (id) on delete cascade not null,
dob date,
id bigint primary key generated always as identity,
live_together text,
name text,
relation text,
sex text,
state text,
street text,
updated_at timestamp with time zone,
zip numeric
);

create table if not exists
donors (
created_at timestamp with time zone,
don_amount character varying,
don_city text,
don_country text,
don_email character varying,
don_name text,
don_notes text,
don_organization text,
don_organization_type text,
don_others text,
don_phone numeric,
don_sex text,
don_state text,
don_street text,
don_zip numeric,
customer_id bigint references customers (id) on delete cascade not null,
updated_at timestamp with time zone,
id bigint primary key generated always as identity
);

create table if not exists
employees (
created_at timestamp with time zone,
emp_bio text,
emp_dob date,
emp_email character varying,
emp_first_name text,
emp_img_url character varying,
emp_last_name text,
emp_phone numeric,
emp_title text,
id bigint primary key generated always as identity
);

create table if not exists
events (
created_at timestamp with time zone,
emp_id double precision,
eve_author text,
eve_author_id bigint,
eve_category text,
eve_date date,
eve_icon character varying,
eve_img_url character varying,
eve_name text,
eve_notes text,
eve_organizer text,
eve_subject text,
eve_tag text,
eve_time time without time zone,
eve_title text,
eve_venue text,
eve_street text,
eve_city text,
eve_state text,
eve_zip numeric,
customer_id bigint references customers (id) on delete cascade not null,
updated_at timestamp with time zone,
id bigint primary key generated always as identity
);

create table if not exists
payments (
created_at timestamp with time zone,
customer_id bigint references customers (id) on delete cascade not null,
emp_id bigint,
id bigint primary key generated always as identity,
pay_amount numeric,
pay_date date,
pay_method text,
pay_notes text,
pay_status text,
updated_at timestamp with time zone,
pay_type text
);

create table if not exists
profiles (
id uuid references auth.users on delete cascade not null primary key,
created_at timestamp
with time zone,
email character varying unique,
first_name text,
last_name text,
updated_at timestamp with time zone,
constraint email_length check (char_length(email) >= 3)
);

create table if not exists
reference (
apt text,
city text,
created_at timestamp without time zone,
customer_id bigint references customers (id) on delete cascade not null,
email character varying,
id bigint primary key generated always as identity,
live_together text,
name text,
phone numeric,
relation text,
sex text,
state text,
street text,
updated_at timestamp with time zone,
zip text
);

create table if not exists
spouse (
apt text,
city text,
created_at timestamp without time zone,
customer_id bigint references customers (id) on delete cascade not null,
dob date,
email character varying,
first_name text,
id bigint primary key generated always as identity,
last_name text,
nationality text,
phone numeric,
sex text,
state text,
street text,
updated_at timestamp with time zone,
zip numeric
);

create table if not exists
subscribers (
created_at timestamp with time zone,
id bigint primary key generated always as identity,
email character varying,
sub_name text,
updated_at timestamp with time zone,
sub_preference text
);

create table if not exists
volunteers (
created_at timestamp with time zone,
name text,
email character varying,
phone numeric
);

-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

create table if not exists
profiles (
id uuid references auth.users on delete cascade not null,
profile_id bigint primary key generated always as identity,
created_at timestamp with time zone,
email character varying unique,
first_name text,
last_name text,
updated_at timestamp with time zone,
constraint email_length check (char_length(email) >= 3)
);

create table if not exists
customers (
id bigint references profiles (profile_id) on delete cascade not null primary key,
category text,
created_at timestamp with time zone,
dob date,
first_name text,
hometown text,
-- id bigint primary key generated always as identity,
last_name text,
marital_status text,
member_status text,
middle_name text,
nationality text,
user_id uuid,
updated_at timestamp with time zone,
sex text
);

create table if not exists
blogs (
blo_author text,
blo_content text,
blo_date date,
blo_img_url character varying,
blo_likes numeric,
blo_title text,
blo_views numeric,
created_at timestamp with time zone,
emp_id double precision,
id bigint primary key generated always as identity,
updated_at timestamp with time zone
);

create table if not exists
contacts (
apt text,
city text,
created_at timestamp without time zone,
customer_id bigint references customers (id) on delete cascade not null,
email character varying,
phone numeric,
state text,
street text,
zip numeric,
updated_at timestamp with time zone
);

create table if not exists
dependents (
apt text,
city text,
created_at timestamp without time zone,
customer_id bigint references customers (id) on delete cascade not null,
dob date,
id bigint primary key generated always as identity,
live_together text,
name text,
relation text,
sex text,
state text,
street text,
updated_at timestamp with time zone,
zip numeric
);

create table if not exists
donors (
created_at timestamp with time zone,
don_amount character varying,
don_city text,
don_country text,
don_email character varying,
don_name text,
don_notes text,
don_organization text,
don_organization_type text,
don_others text,
don_phone numeric,
don_sex text,
don_state text,
don_street text,
don_zip numeric,
customer_id bigint references customers (id) on delete cascade not null,
updated_at timestamp with time zone,
id bigint primary key generated always as identity
);

create table if not exists
employees (
created_at timestamp with time zone,
emp_bio text,
emp_dob date,
emp_email character varying,
emp_first_name text,
emp_img_url character varying,
emp_last_name text,
emp_phone numeric,
emp_title text,
id bigint primary key generated always as identity
);

create table if not exists
events (
created_at timestamp with time zone,
emp_id double precision,
eve_author text,
eve_author_id bigint,
eve_category text,
eve_date date,
eve_icon character varying,
eve_img_url character varying,
eve_name text,
eve_notes text,
eve_organizer text,
eve_subject text,
eve_tag text,
eve_time time without time zone,
eve_title text,
eve_venue text,
eve_street text,
eve_city text,
eve_state text,
eve_zip numeric,
customer_id bigint references customers (id) on delete cascade not null,
updated_at timestamp with time zone,
id bigint primary key generated always as identity
);

create table if not exists
payments (
created_at timestamp with time zone,
customer_id bigint references customers (id) on delete cascade not null,
emp_id bigint,
id bigint primary key generated always as identity,
pay_amount numeric,
pay_date date,
pay_method text,
pay_notes text,
pay_status text,
updated_at timestamp with time zone,
pay_type text
);

create table if not exists
reference (
apt text,
city text,
created_at timestamp without time zone,
customer_id bigint references customers (id) on delete cascade not null,
email character varying,
id bigint primary key generated always as identity,
live_together text,
name text,
phone numeric,
relation text,
sex text,
state text,
street text,
updated_at timestamp with time zone,
zip text
);

create table if not exists
spouse (
apt text,
city text,
created_at timestamp without time zone,
customer_id bigint references customers (id) on delete cascade not null,
dob date,
email character varying,
first_name text,
id bigint primary key generated always as identity,
last_name text,
nationality text,
phone numeric,
sex text,
state text,
street text,
updated_at timestamp with time zone,
zip numeric
);

create table if not exists
subscribers (
created_at timestamp with time zone,
id bigint primary key generated always as identity,
email character varying,
sub_name text,
updated_at timestamp with time zone,
sub_preference text
);

create table if not exists
volunteers (
created_at timestamp with time zone,
name text,
email character varying,
phone numeric,
id bigint primary key generated always as identity
);

Create a members table if not exists with data such as member's first name, last name, middle, their gender, email, phone, and date of birth as dob. Add to the members table a uuid key pointing to reference a key in the users table in the auth schema. Adjust the membership table to have a foreign relationship with the members table where one member can have only one membership.
