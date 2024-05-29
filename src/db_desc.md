1. An organization that people sign up for membership. They pay to register and renew this membership every year.
2. The member signs up either as single, family, single family or senior citizen.
3. Every member has a reference/emergency contact, and they can have or not a spouse or dependents.
4. The organization can send mails to members regarding their membeship or the organization
5. Members contribute money in the event a member or a family member die, and contribution is based on membership type.

<!--  -->

Profile/customer table, function and trigger:
CREATE TABLE public.profiles (
id UUID REFERENCES auth.users NOT NULL,
user_id bigint generated always as identity,
created_at timestamp with time zone,
email text NULL,
first_name text NULL,
last_name text NULL,
PRIMARY KEY (id)
);

ALTER TABLE public.profiles
ENABLE ROW LEVEL SECURITY;

CREATE POLICY
"Can only view own profile data."
ON public.profiles
FOR SELECT
USING ( auth.uid() = id );

CREATE POLICY
"Can only update own profile data."
ON public.profiles
FOR UPDATE
USING ( auth.uid() = id );

CREATE FUNCTION
public.create_profile_for_new_user()
RETURNS TRIGGER AS

$$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER
create_profile_on_signup
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE PROCEDURE
  public.create_profile_for_new_user();
$$
