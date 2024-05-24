--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-05-24 15:53:42 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3650 (class 1262 OID 16672)
-- Name: HueDomino; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "HueDomino" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';


ALTER DATABASE "HueDomino" OWNER TO postgres;


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 234 (class 1255 OID 16744)
-- Name: add_to_playable(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.add_to_playable() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF NEW.levelnumber = 8 THEN
    IF NEW.levelNation = 'italy' THEN
      INSERT INTO playable (userid, levelnumber, levelNation) VALUES (NEW.userid, 1, 'usa');
    ELSIF NEW.levelNation = 'usa' THEN
      INSERT INTO playable (userid, levelnumber, levelNation) VALUES (NEW.userid, 1, 'japan');
    ELSIF NEW.levelNation = 'japan' THEN
      INSERT INTO playable (userid, levelnumber, levelNation) VALUES (NEW.userid, 1, 'iceland');
    ELSIF NEW.levelNation = 'iceland' THEN
      INSERT INTO playable (userid, levelnumber, levelNation) VALUES (NEW.userid, 1, 'australia');
	ELSIF NEW.levelNation = 'australia' THEN
      INSERT INTO playable (userid, levelnumber, levelNation) VALUES (NEW.userid, 1, 'france');
	ELSIF NEW.levelNation = 'france' THEN
      INSERT INTO playable (userid, levelnumber, levelNation) VALUES (NEW.userid, 1, 'argentina');
	ELSIF NEW.levelNation = 'argentina' THEN
      INSERT INTO playable (userid, levelnumber, levelNation) VALUES (NEW.userid, 1, 'canada');
    ELSE
      
    END IF;
  ELSE
    INSERT INTO playable (userid, levelnumber, levelNation) VALUES (NEW.userid, NEW.levelnumber + 1, NEW.levelNation);
  END IF;
  RETURN NEW;
END;$$;


ALTER FUNCTION public.add_to_playable() OWNER TO postgres;

--
-- TOC entry 222 (class 1255 OID 16767)
-- Name: add_user_to_playable(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.add_user_to_playable() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO playable (userid, levelnumber, levelNation) VALUES (NEW.id, 1, 'italy');
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.add_user_to_playable() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 16772)
-- Name: friendship; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.friendship (
    userid1 integer NOT NULL,
    userid2 integer NOT NULL
);


ALTER TABLE public.friendship OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16687)
-- Name: levels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.levels (
    num integer NOT NULL,
    nation character varying(255) NOT NULL
);


ALTER TABLE public.levels OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16724)
-- Name: passed; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.passed (
    userid integer NOT NULL,
    levelnumber integer NOT NULL,
    levelnation character varying(255) NOT NULL
);


ALTER TABLE public.passed OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16703)
-- Name: playable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.playable (
    userid integer NOT NULL,
    levelnumber integer NOT NULL,
    levelnation character varying(255) NOT NULL
);


ALTER TABLE public.playable OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16755)
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    session_id character varying(255) NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    expires_at timestamp without time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16674)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    description character varying(50) DEFAULT 'Hello! I love playing Hue Domino'::character varying NOT NULL,
    path_to_profile_picture text DEFAULT '../immagini_profilo/default.png'::text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16673)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3651 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3465 (class 2604 OID 16677)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3644 (class 0 OID 16772)
-- Dependencies: 221
-- Data for Name: friendship; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.friendship (userid1, userid2) VALUES (7, 25);
INSERT INTO public.friendship (userid1, userid2) VALUES (7, 26);
INSERT INTO public.friendship (userid1, userid2) VALUES (25, 7);
INSERT INTO public.friendship (userid1, userid2) VALUES (25, 24);
INSERT INTO public.friendship (userid1, userid2) VALUES (7, 24);
INSERT INTO public.friendship (userid1, userid2) VALUES (7, 27);
INSERT INTO public.friendship (userid1, userid2) VALUES (30, 25);
INSERT INTO public.friendship (userid1, userid2) VALUES (30, 27);
INSERT INTO public.friendship (userid1, userid2) VALUES (32, 24);
INSERT INTO public.friendship (userid1, userid2) VALUES (32, 27);
INSERT INTO public.friendship (userid1, userid2) VALUES (33, 7);
INSERT INTO public.friendship (userid1, userid2) VALUES (33, 27);
INSERT INTO public.friendship (userid1, userid2) VALUES (34, 7);
INSERT INTO public.friendship (userid1, userid2) VALUES (41, 38);
INSERT INTO public.friendship (userid1, userid2) VALUES (41, 39);
INSERT INTO public.friendship (userid1, userid2) VALUES (42, 38);
INSERT INTO public.friendship (userid1, userid2) VALUES (42, 39);
INSERT INTO public.friendship (userid1, userid2) VALUES (43, 38);
INSERT INTO public.friendship (userid1, userid2) VALUES (43, 39);
INSERT INTO public.friendship (userid1, userid2) VALUES (44, 38);
INSERT INTO public.friendship (userid1, userid2) VALUES (44, 39);
INSERT INTO public.friendship (userid1, userid2) VALUES (45, 38);
INSERT INTO public.friendship (userid1, userid2) VALUES (45, 39);


--
-- TOC entry 3640 (class 0 OID 16687)
-- Dependencies: 217
-- Data for Name: levels; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.levels (num, nation) VALUES (1, 'italy');
INSERT INTO public.levels (num, nation) VALUES (2, 'italy');
INSERT INTO public.levels (num, nation) VALUES (3, 'italy');
INSERT INTO public.levels (num, nation) VALUES (4, 'italy');
INSERT INTO public.levels (num, nation) VALUES (5, 'italy');
INSERT INTO public.levels (num, nation) VALUES (6, 'italy');
INSERT INTO public.levels (num, nation) VALUES (7, 'italy');
INSERT INTO public.levels (num, nation) VALUES (8, 'italy');
INSERT INTO public.levels (num, nation) VALUES (1, 'usa');
INSERT INTO public.levels (num, nation) VALUES (2, 'usa');
INSERT INTO public.levels (num, nation) VALUES (3, 'usa');
INSERT INTO public.levels (num, nation) VALUES (4, 'usa');
INSERT INTO public.levels (num, nation) VALUES (5, 'usa');
INSERT INTO public.levels (num, nation) VALUES (6, 'usa');
INSERT INTO public.levels (num, nation) VALUES (7, 'usa');
INSERT INTO public.levels (num, nation) VALUES (8, 'usa');
INSERT INTO public.levels (num, nation) VALUES (1, 'japan');
INSERT INTO public.levels (num, nation) VALUES (2, 'japan');
INSERT INTO public.levels (num, nation) VALUES (3, 'japan');
INSERT INTO public.levels (num, nation) VALUES (4, 'japan');
INSERT INTO public.levels (num, nation) VALUES (5, 'japan');
INSERT INTO public.levels (num, nation) VALUES (6, 'japan');
INSERT INTO public.levels (num, nation) VALUES (7, 'japan');
INSERT INTO public.levels (num, nation) VALUES (8, 'japan');
INSERT INTO public.levels (num, nation) VALUES (1, 'iceland');
INSERT INTO public.levels (num, nation) VALUES (2, 'iceland');
INSERT INTO public.levels (num, nation) VALUES (3, 'iceland');
INSERT INTO public.levels (num, nation) VALUES (4, 'iceland');
INSERT INTO public.levels (num, nation) VALUES (5, 'iceland');
INSERT INTO public.levels (num, nation) VALUES (6, 'iceland');
INSERT INTO public.levels (num, nation) VALUES (7, 'iceland');
INSERT INTO public.levels (num, nation) VALUES (8, 'iceland');
INSERT INTO public.levels (num, nation) VALUES (1, 'australia');
INSERT INTO public.levels (num, nation) VALUES (2, 'australia');
INSERT INTO public.levels (num, nation) VALUES (3, 'australia');
INSERT INTO public.levels (num, nation) VALUES (4, 'australia');
INSERT INTO public.levels (num, nation) VALUES (5, 'australia');
INSERT INTO public.levels (num, nation) VALUES (6, 'australia');
INSERT INTO public.levels (num, nation) VALUES (7, 'australia');
INSERT INTO public.levels (num, nation) VALUES (8, 'australia');
INSERT INTO public.levels (num, nation) VALUES (1, 'argentina');
INSERT INTO public.levels (num, nation) VALUES (2, 'argentina');
INSERT INTO public.levels (num, nation) VALUES (3, 'argentina');
INSERT INTO public.levels (num, nation) VALUES (4, 'argentina');
INSERT INTO public.levels (num, nation) VALUES (5, 'argentina');
INSERT INTO public.levels (num, nation) VALUES (6, 'argentina');
INSERT INTO public.levels (num, nation) VALUES (7, 'argentina');
INSERT INTO public.levels (num, nation) VALUES (8, 'argentina');
INSERT INTO public.levels (num, nation) VALUES (1, 'france');
INSERT INTO public.levels (num, nation) VALUES (2, 'france');
INSERT INTO public.levels (num, nation) VALUES (3, 'france');
INSERT INTO public.levels (num, nation) VALUES (4, 'france');
INSERT INTO public.levels (num, nation) VALUES (5, 'france');
INSERT INTO public.levels (num, nation) VALUES (6, 'france');
INSERT INTO public.levels (num, nation) VALUES (7, 'france');
INSERT INTO public.levels (num, nation) VALUES (8, 'france');
INSERT INTO public.levels (num, nation) VALUES (1, 'canada');
INSERT INTO public.levels (num, nation) VALUES (2, 'canada');
INSERT INTO public.levels (num, nation) VALUES (3, 'canada');
INSERT INTO public.levels (num, nation) VALUES (4, 'canada');
INSERT INTO public.levels (num, nation) VALUES (5, 'canada');
INSERT INTO public.levels (num, nation) VALUES (6, 'canada');
INSERT INTO public.levels (num, nation) VALUES (7, 'canada');
INSERT INTO public.levels (num, nation) VALUES (8, 'canada');


--
-- TOC entry 3642 (class 0 OID 16724)
-- Dependencies: 219
-- Data for Name: passed; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 1, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 2, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 3, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 4, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 5, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 6, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 7, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (24, 1, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (24, 2, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (25, 1, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (26, 1, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (26, 2, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (26, 3, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (26, 4, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (26, 5, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (27, 1, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (28, 1, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 8, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 1, 'usa');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 2, 'usa');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 3, 'usa');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 4, 'usa');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 5, 'usa');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 6, 'usa');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 7, 'usa');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 8, 'usa');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (9999, 8, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (9999, 8, 'usa');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (9999, 8, 'japan');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (9999, 8, 'iceland');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (9999, 8, 'australia');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (9999, 8, 'france');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (9999, 8, 'argentina');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (9999, 8, 'canada');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 1, 'japan');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 2, 'japan');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 3, 'japan');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 4, 'japan');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 5, 'japan');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 6, 'japan');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 7, 'japan');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 8, 'japan');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 1, 'iceland');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 2, 'iceland');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 3, 'iceland');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 4, 'iceland');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 5, 'iceland');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 6, 'iceland');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 7, 'iceland');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 8, 'iceland');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 1, 'australia');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 2, 'australia');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 3, 'australia');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 4, 'australia');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 5, 'australia');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 6, 'australia');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 7, 'australia');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 8, 'australia');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 1, 'france');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 2, 'france');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 3, 'france');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 4, 'france');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 5, 'france');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 6, 'france');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 7, 'france');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 8, 'france');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 1, 'argentina');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 2, 'argentina');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 3, 'argentina');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 4, 'argentina');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 5, 'argentina');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 6, 'argentina');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 7, 'argentina');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 8, 'argentina');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 1, 'canada');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 2, 'canada');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 3, 'canada');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 4, 'canada');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 5, 'canada');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 6, 'canada');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 7, 'canada');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (7, 8, 'canada');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (27, 2, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (27, 3, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (29, 1, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (29, 2, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (30, 1, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (32, 1, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (33, 1, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (34, 1, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (37, 1, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (41, 1, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (42, 1, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (43, 1, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (44, 1, 'italy');
INSERT INTO public.passed (userid, levelnumber, levelnation) VALUES (45, 1, 'italy');


--
-- TOC entry 3641 (class 0 OID 16703)
-- Dependencies: 218
-- Data for Name: playable; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (9, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (13, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (17, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (18, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (19, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (20, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (21, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (22, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (23, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 2, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 3, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 4, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 5, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 6, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 7, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 8, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (24, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (24, 2, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (24, 3, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (25, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (25, 2, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (26, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (26, 2, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (26, 3, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (26, 4, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (26, 5, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (26, 6, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (27, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (27, 2, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (28, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (28, 2, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 1, 'usa');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 2, 'usa');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 3, 'usa');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 4, 'usa');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 5, 'usa');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 6, 'usa');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 7, 'usa');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 8, 'usa');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 1, 'japan');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (9999, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (9999, 8, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (9999, 1, 'usa');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (9999, 8, 'usa');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (9999, 1, 'japan');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (9999, 8, 'japan');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (9999, 1, 'iceland');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (9999, 8, 'iceland');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (9999, 1, 'australia');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (9999, 8, 'australia');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (9999, 1, 'france');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (9999, 8, 'france');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (9999, 1, 'argentina');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (9999, 8, 'argentina');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (9999, 1, 'canada');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (9999, 8, 'canada');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 2, 'japan');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 3, 'japan');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 4, 'japan');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 5, 'japan');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 6, 'japan');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 7, 'japan');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 8, 'japan');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 1, 'iceland');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 2, 'iceland');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 3, 'iceland');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 4, 'iceland');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 5, 'iceland');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 6, 'iceland');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 7, 'iceland');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 8, 'iceland');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 1, 'australia');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 2, 'australia');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 3, 'australia');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 4, 'australia');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 5, 'australia');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 6, 'australia');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 7, 'australia');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 8, 'australia');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 1, 'france');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 2, 'france');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 3, 'france');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 4, 'france');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 5, 'france');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 6, 'france');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 7, 'france');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 8, 'france');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 1, 'argentina');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 2, 'argentina');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 3, 'argentina');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 4, 'argentina');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 5, 'argentina');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 6, 'argentina');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 7, 'argentina');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 8, 'argentina');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 1, 'canada');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 2, 'canada');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 3, 'canada');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 4, 'canada');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 5, 'canada');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 6, 'canada');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 7, 'canada');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (7, 8, 'canada');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (27, 3, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (27, 4, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (29, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (29, 2, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (29, 3, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (30, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (30, 2, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (31, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (32, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (32, 2, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (33, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (33, 2, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (34, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (34, 2, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (35, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (36, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (37, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (37, 2, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (38, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (39, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (40, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (41, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (41, 2, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (42, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (42, 2, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (43, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (43, 2, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (44, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (44, 2, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (45, 1, 'italy');
INSERT INTO public.playable (userid, levelnumber, levelnation) VALUES (45, 2, 'italy');


--
-- TOC entry 3643 (class 0 OID 16755)
-- Dependencies: 220
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('f0204f9c-9a12-4409-bf8a-2266432cf663', 7, '2024-04-28 17:52:12.69278', '2024-04-28 18:52:12.692');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('7269536a-b42a-40c0-bfb0-5862e0d7ed13', 24, '2024-04-29 15:46:45.860243', '2024-04-29 16:46:45.86');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('4aac3c53-3a1e-49f1-a6c7-0c037dbf651d', 7, '2024-04-29 16:16:23.585932', '2024-04-29 17:16:23.585');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('ec2ffbe4-e423-4ec4-a263-fb433f3e24c4', 7, '2024-04-29 16:17:50.425573', '2024-04-29 17:17:50.425');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('9e2f1546-46f1-479c-9ad4-601856357247', 24, '2024-04-29 22:18:52.084259', '2024-04-29 23:18:52.083');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('488e95e7-02dc-42f2-b4a6-7e3869e23744', 7, '2024-04-30 07:53:46.591997', '2024-04-30 08:53:46.591');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('85816ad4-8e36-4628-99ca-42bd3cc33642', 25, '2024-05-01 08:10:10.763607', '2024-05-01 09:10:10.763');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('2b45f6d1-a5b6-4f91-8f60-7e3922798f67', 25, '2024-05-01 08:15:12.990728', '2024-05-01 09:15:12.99');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('54d53cde-a3e2-416b-aaf1-18eef739c1c1', 25, '2024-05-01 09:26:07.089833', '2024-05-01 10:26:07.089');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('f2ad7c27-fa45-4e4a-9a88-835466bedd74', 25, '2024-05-01 10:44:35.758651', '2024-05-01 11:44:35.758');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('162db9cc-b4b6-4dfe-a44a-849105d27515', 25, '2024-05-01 12:01:03.374043', '2024-05-01 13:01:03.37');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('e140d7ec-9c80-466d-bbab-a23a1a7fc38e', 26, '2024-05-01 12:15:49.780283', '2024-05-01 13:15:49.779');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('03efdf48-a0c5-4386-b77f-4abe74f91928', 26, '2024-05-01 17:16:45.657491', '2024-05-01 18:16:45.657');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('0b92a183-92c8-4040-aa98-1ae1d206039c', 26, '2024-05-01 20:47:14.212795', '2024-05-01 21:47:14.212');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('a0118b09-a780-48cc-b23c-3d4e4179aced', 26, '2024-05-02 10:13:54.609708', '2024-05-02 11:13:54.609');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('77a4414b-71e4-4ae7-854a-cfd70baee49a', 27, '2024-05-02 16:45:20.571762', '2024-05-02 17:45:20.571');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('192a7678-b97b-4f96-a9ac-dffd39619c29', 27, '2024-05-03 08:04:46.544062', '2024-05-03 09:04:46.543');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('0892ab4d-6b6d-47b3-aca9-c712ac1f0ac0', 27, '2024-05-03 08:05:47.764717', '2024-05-03 09:05:47.764');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('2a5aef87-f306-4bfe-8d8f-074abda1f924', 7, '2024-05-03 16:39:02.687307', '2024-05-03 17:39:02.687');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('9628193f-ab2d-4f1c-9fbd-2db477224b59', 7, '2024-05-04 14:13:54.831404', '2024-05-04 15:13:54.831');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('bfa12e90-fb88-4fe2-a343-b9d5d9319f03', 27, '2024-05-05 11:15:48.41119', '2024-05-05 12:15:48.41');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('2144daa1-5ed0-409a-9986-29d9ede9f3d4', 27, '2024-05-05 11:52:21.265595', '2024-05-05 12:52:21.264');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('b918c0c1-3fe5-4629-84f1-62530bb83697', 7, '2024-05-05 17:46:22.833059', '2024-05-05 18:46:22.832');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('eb132027-7a4c-4675-bd8f-1c8af084333c', 27, '2024-05-05 18:38:10.703775', '2024-05-05 19:38:10.703');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('8cb8b057-30e7-4d3b-9ba1-21779a4cb041', 27, '2024-05-06 08:24:09.935004', '2024-05-06 09:24:09.934');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('75b13c13-2b13-458e-af28-f408f7710e73', 27, '2024-05-07 12:33:41.628259', '2024-05-07 13:33:41.628');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('c07a5fcb-1a74-47ea-8252-322071b7dbf7', 27, '2024-05-07 20:05:45.597364', '2024-05-07 21:05:45.597');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('c1c6a6ec-f812-4928-994d-b924d7980cd8', 27, '2024-05-08 15:03:47.28121', '2024-05-08 16:03:47.28');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('249fed1b-8250-42a1-a095-8f339036cc11', 27, '2024-05-08 15:06:01.567571', '2024-05-08 16:06:01.567');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('a8cbbf04-9925-4962-907d-a97c14e6a71c', 28, '2024-05-08 15:09:22.513156', '2024-05-08 16:09:22.513');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('ac129eb4-4378-4d55-ad4e-b27d524381d3', 7, '2024-05-08 19:19:14.045114', '2024-05-08 20:19:14.044');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('fdeee1cc-44e9-4dfe-955d-ffd9c71aa77d', 7, '2024-05-09 08:33:25.989272', '2024-05-09 09:33:25.988');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('71586dec-706e-4e43-aa7a-76c7dc960696', 7, '2024-05-09 13:02:14.583837', '2024-05-09 14:02:14.583');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('28217033-04fd-4b86-ae6c-6c502805e99a', 7, '2024-05-10 08:42:38.399661', '2024-05-10 09:42:38.399');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('841470f4-aa2e-4913-b104-247226a5193b', 7, '2024-05-10 12:44:22.915235', '2024-05-10 13:44:22.914');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('c52e7372-0a6c-41f7-b664-b25f66a64e6d', 27, '2024-05-10 20:10:02.461917', '2024-05-10 21:10:02.461');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('9ccd8f7c-ae58-4079-8940-7550b15e5ded', 7, '2024-05-11 09:35:21.899942', '2024-05-11 10:35:21.899');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('d200f4ab-9927-4cc1-b7b4-1dd116912671', 7, '2024-05-11 09:52:49.4568', '2024-05-11 10:52:49.453');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('f55f9577-a009-44de-8e90-64f849c86ac8', 7, '2024-05-11 11:15:34.283799', '2024-05-11 12:15:34.283');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('f1d00591-e5cd-4786-8b50-95b298b2e67a', 24, '2024-05-11 14:37:38.156401', '2024-05-11 15:37:38.156');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('0fff3f87-cf7a-4109-9bd4-42c542395df4', 25, '2024-05-11 14:38:20.770048', '2024-05-11 15:38:20.769');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('c017f511-0edc-43c6-880b-03edcdb3be54', 26, '2024-05-11 14:39:10.332245', '2024-05-11 15:39:10.331');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('892b6544-56e3-442b-8c4b-35e149e84263', 7, '2024-05-11 14:39:35.493918', '2024-05-11 15:39:35.493');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('33c35bdb-6f9e-4d06-ab40-3d39f549c62e', 27, '2024-05-11 14:45:51.566721', '2024-05-11 15:45:51.566');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('83408e0a-f525-4bfc-85a1-82c2ced0d6f9', 7, '2024-05-11 14:46:45.980222', '2024-05-11 15:46:45.98');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('a6706604-7c7b-4c7d-9023-db19a6b3f5b4', 25, '2024-05-11 18:06:37.600111', '2024-05-11 19:06:37.599');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('fa1960ec-4d24-4fd5-9f66-97581c386acf', 7, '2024-05-11 18:09:00.039592', '2024-05-11 19:09:00.039');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('9a2d202c-43bb-4380-b629-22e86bc63f1a', 7, '2024-05-11 19:11:39.607886', '2024-05-11 20:11:39.607');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('583e3541-c0cd-45de-9053-cb82db392c6d', 7, '2024-05-11 19:15:01.883757', '2024-05-11 20:15:01.883');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('46b3cd62-ad2e-4708-b6f1-713884d75ba4', 7, '2024-05-11 21:25:05.189348', '2024-05-11 22:25:05.189');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('004bad41-1ee3-4f56-89ac-24a9aed5b7da', 7, '2024-05-12 16:21:19.145063', '2024-05-12 17:21:19.144');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('d6354b2d-b46c-4b59-b887-e2f984031600', 7, '2024-05-13 14:51:14.174141', '2024-05-13 15:51:14.173');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('14f149d8-46cc-4945-83a0-1d6c9c8e5a90', 7, '2024-05-15 09:10:39.545596', '2024-05-15 10:10:39.545');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('78b3832b-0c2a-4486-916b-7e292806cc62', 25, '2024-05-15 15:13:19.092329', '2024-05-15 16:13:19.092');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('50f36972-39d2-4aba-9ca0-bf9ec94fc752', 7, '2024-05-15 18:38:43.295804', '2024-05-15 19:38:43.295');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('1f9e31d6-f638-4700-8de0-ebc5b56dde27', 7, '2024-05-16 08:05:13.752583', '2024-05-16 09:05:13.752');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('a9bec2d7-58d1-473e-b21a-790390aabfc0', 7, '2024-05-16 12:05:52.196379', '2024-05-16 13:05:52.195');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('1e6e1a17-ceaa-48f0-a683-c850ce569132', 7, '2024-05-16 21:53:26.115226', '2024-05-16 22:53:26.114');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('08646de9-9b22-47df-a0de-afc0802ebc16', 7, '2024-05-17 08:04:36.598961', '2024-05-17 09:04:36.598');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('ec826d18-a7db-437d-9b77-5e8529608f39', 7, '2024-05-17 12:01:05.648792', '2024-05-17 13:01:05.648');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('379de989-8d98-48da-9b7e-cb9f2ee90660', 7, '2024-05-17 13:27:50.970408', '2024-05-17 14:27:50.97');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('d3d42fbd-17c1-4899-866f-a19ffaa45db1', 7, '2024-05-17 14:21:00.320636', '2024-05-17 15:21:00.32');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('6e09d217-f5c8-4d05-a530-6867c7fc0e10', 27, '2024-05-17 15:59:36.075579', '2024-05-17 16:59:36.075');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('f46d86b0-13be-4842-a03a-9675f90619e7', 7, '2024-05-17 16:15:52.490645', '2024-05-17 17:15:52.49');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('8d16d667-c474-48f8-a2cd-7ab4edc30edd', 29, '2024-05-17 16:40:36.724541', '2024-05-17 17:40:36.724');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('ee2ecdcd-7a3b-4df3-9f72-d08a2aa9186d', 30, '2024-05-17 17:05:40.209227', '2024-05-17 18:05:40.209');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('6aeaecea-e6a5-4df6-9e81-cc3811e3b465', 31, '2024-05-18 17:43:22.106533', '2024-05-18 18:43:22.106');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('3b06f14e-e9d3-4176-a943-364e824e1080', 32, '2024-05-18 17:47:01.405782', '2024-05-18 18:47:01.405');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('b6d5e4a1-633f-4b1c-b804-e689b3a668cf', 7, '2024-05-19 08:36:56.659354', '2024-05-19 09:36:56.659');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('61e748ef-6126-4580-89e1-26c3c5acb0c1', 7, '2024-05-19 09:08:01.276256', '2024-05-19 10:08:01.276');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('a04957e6-f2ff-437b-847c-2097bff12b21', 7, '2024-05-19 12:43:11.476696', '2024-05-19 13:43:11.476');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('a9edc4e7-c1b0-4dc1-a849-32f00c8a9342', 7, '2024-05-19 17:25:12.944986', '2024-05-19 18:25:12.944');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('a2e1a23a-c82d-44b1-86bf-898a40a128a4', 7, '2024-05-19 17:25:52.243121', '2024-05-19 18:25:52.242');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('d471375b-d473-4d55-b19c-4f21c501a8bd', 7, '2024-05-19 17:27:07.246023', '2024-05-19 18:27:07.245');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('de3629de-7aa7-4506-8b39-dec21d7e35c6', 7, '2024-05-19 17:27:50.933784', '2024-05-19 18:27:50.933');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('b6e41636-50dd-47bb-910d-3b726d6ae738', 7, '2024-05-19 17:30:30.207843', '2024-05-19 18:30:30.207');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('e4a38d48-e608-4472-8e33-ac3d0cddb583', 7, '2024-05-19 18:15:16.758552', '2024-05-19 19:15:16.758');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('d33a4edc-7342-4da1-bab6-9407fd60fbf1', 7, '2024-05-19 18:16:08.285627', '2024-05-19 19:16:08.285');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('64ddf38d-39b4-4a1a-b4be-21f24acadb20', 33, '2024-05-19 18:52:11.259408', '2024-05-19 19:52:11.259');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('89de5ece-1f21-49bf-8a35-f19c6d38941d', 34, '2024-05-19 19:28:57.877271', '2024-05-19 20:28:57.877');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('d658e662-c130-40c4-992d-f2c5cf8b75b7', 7, '2024-05-20 10:09:52.861895', '2024-05-20 11:09:52.861');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('228c2f7c-9861-43a2-9014-b7215eec0cab', 35, '2024-05-20 10:13:28.276728', '2024-05-20 11:13:28.276');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('53a5d62d-ceb6-4114-884a-979a64632144', 36, '2024-05-20 18:52:43.237319', '2024-05-20 19:52:43.237');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('e7cd9073-740d-4a11-bf13-475e902b7a2c', 7, '2024-05-21 18:02:24.074642', '2024-05-21 19:02:24.074');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('725fd949-c8f8-4f9f-8cd6-3ef78092fce2', 7, '2024-05-21 18:27:51.593167', '2024-05-21 19:27:51.592');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('4200d97b-0bab-43c6-a6b8-7ce6543d5165', 7, '2024-05-21 21:24:20.510331', '2024-05-21 22:24:20.51');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('d33cf7d9-05cb-4dc1-8e85-80fe17f6e9ac', 7, '2024-05-21 21:26:19.284338', '2024-05-21 22:26:19.284');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('266bb29c-e881-4199-b229-d23e1f1959d2', 7, '2024-05-21 21:28:05.689261', '2024-05-21 22:28:05.688');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('19646df9-f5b1-43d1-b98a-28bf7a129cba', 7, '2024-05-21 21:39:36.334066', '2024-05-21 22:39:36.333');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('16c08205-ef9b-4ce0-bbeb-5fa9269d9790', 7, '2024-05-21 22:02:09.448034', '2024-05-21 23:02:09.447');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('530d96da-2c83-4841-aba3-9c82479f1462', 7, '2024-05-22 08:30:51.748692', '2024-05-22 09:30:51.748');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('56ae89aa-c376-4409-98e0-713712a75556', 7, '2024-05-22 08:47:44.858619', '2024-05-22 09:47:44.858');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('e26c0e44-869e-42b3-b5b8-8cc5051fe76e', 7, '2024-05-22 09:05:33.359676', '2024-05-22 10:05:33.359');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('1af65050-c0f6-4d19-aa55-6a0e2bd7de56', 29, '2024-05-22 09:07:51.351156', '2024-05-22 10:07:51.35');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('c68c907a-9807-41f4-9c3e-02fcc3160d1d', 37, '2024-05-22 09:17:15.903568', '2024-05-22 10:17:15.903');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('0447ee2f-5cb7-4784-8fc7-41527db6d404', 7, '2024-05-22 09:41:05.886466', '2024-05-22 10:41:05.886');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('4ee6dc8d-3151-49d5-b5ce-130f36c846a0', 37, '2024-05-22 09:43:05.373192', '2024-05-22 10:43:05.372');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('a23b8284-c287-471c-a1b1-289071148540', 38, '2024-05-22 10:37:40.996793', '2024-05-22 11:37:40.996');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('19a7e725-16f6-411c-9960-19209c92ddeb', 39, '2024-05-22 10:43:55.275125', '2024-05-22 11:43:55.275');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('42751d0f-3edb-4333-8de9-2d2310a9146c', 7, '2024-05-23 08:49:33.384453', '2024-05-23 09:49:33.384');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('5d3dd429-0306-44c1-bfa8-216e0033742d', 40, '2024-05-23 08:52:16.611271', '2024-05-23 09:52:16.611');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('c5ae8d64-a1f1-4c18-a921-78449cf344d2', 41, '2024-05-23 08:55:37.471332', '2024-05-23 09:55:37.471');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('93038e45-4688-414a-a70f-8db7dc429f21', 42, '2024-05-23 09:19:43.019814', '2024-05-23 10:19:43.019');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('2820cdaf-1d4e-4341-892a-e7bc7277fe71', 43, '2024-05-23 09:39:14.85853', '2024-05-23 10:39:14.858');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('a0f6dd12-7653-4355-bdb0-75c2dccb48be', 7, '2024-05-23 18:33:00.890658', '2024-05-23 19:33:00.89');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('08b735e5-bf82-423f-a350-f0c023b7edf2', 44, '2024-05-23 18:37:54.463543', '2024-05-23 19:37:54.463');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('628f9535-7a94-4c6a-b9f0-4b73bb97fe99', 7, '2024-05-24 14:39:33.391772', '2024-05-24 15:39:33.391');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('0898b93c-d405-4dee-97d1-5d34f96c7a05', 7, '2024-05-24 14:41:24.929199', '2024-05-24 15:41:24.928');
INSERT INTO public.sessions (session_id, user_id, created_at, expires_at) VALUES ('e6bbd7c9-a4b3-4cf9-b49d-fb24c0b8537c', 45, '2024-05-24 15:04:22.940676', '2024-05-24 16:04:22.94');


--
-- TOC entry 3639 (class 0 OID 16674)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (9, 'Francesco2', '$2b$10$GKLfs2dHA2ALi5LBKlCRguaG2EwGnGXy3N1EUNYvqUULNHMi5lMMO', 'francescotorella2002@gmail.com', 'Hello! I love playing Hue Domino', 'http://localhost:3000/immagini_profilo/default.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (13, 'FrancescoUni', '$2b$10$wZVrwcEjgGq.srXPCWjVC.Js75Wj4nY4jPT6tQLt6lVZw2QOqON2i', 'torella.1984820@studenti.uniroma1.it', 'Hello! I love playing Hue Domino', 'http://localhost:3000/immagini_profilo/default.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (17, 'garoga123', '$2b$10$PudyFLjuCDb80Xoe/VYl1.MKPWrPedLLdtuDJko0JVQnO5VJQFVrq', 'garoga8602@weirby.com', 'Hello! I love playing Hue Domino', 'http://localhost:3000/immagini_profilo/default.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (18, 'garoga123231', '$2b$10$0a.GfD47LYbluU60NKkKvuRVL86hOFN4HJot4GN3rfgano0peY.VW', 'garogaaaa8602@weirby.com', 'Hello! I love playing Hue Domino', 'http://localhost:3000/immagini_profilo/default.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (19, 'FrancescoGaroga', '$2b$10$X6hINPGZPkWe8gGuPxbbFO1kahbDKzwh7jnnQfDU8Ud3u7SvSMGpe', 'gibffim12892@msback.comf', 'Hello! I love playing Hue Domino', 'http://localhost:3000/immagini_profilo/default.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (20, 'FrancescoGimmi', '$2b$10$sYjsCIG84PcnklHMf4zztOEbxYgDr6Z7fhk1inA6rFXZaQb6MPEqW', 'gibim12892@msback.com', 'Hello! I love playing Hue Domino', 'http://localhost:3000/immagini_profilo/default.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (21, 'FrancescoGimmiee', '$2b$10$dhVTfv/kTuxhT0BCpyFzSOWw3g7sawwgC3qWTZAXtAkNuuVoh6IAa', 'gibwrrim12892@msback.com', 'Hello! I love playing Hue Domino', 'http://localhost:3000/immagini_profilo/default.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (22, 'FrancescoG', '$2b$10$CCVAqLk7FqL/JnbJdmNYnup04kF1BsXvPxeQffy.mDDf/8pmJJWU2', 'gibfim12892@msback.com', 'Hello! I love playing Hue Domino', 'http://localhost:3000/immagini_profilo/default.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (23, 'Francescofg', '$2b$10$EvK6jodHwOn.jvqvQ.eLTuCyEvn8igCpr3TLUocOECEj6KHFg6I4O', 'fdgibim12892@msback.com', 'Hello! I love playing Hue Domino', 'http://localhost:3000/immagini_profilo/default.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (29, 'Prova12', '$2a$10$XMdJHFt7fxS5RcIVkipiS.ZCR4pNE1REEs9776j9zrNpQqPzCbkve', 'prova@gmail.com', 'Presentazione
', 'http://localhost:3000/immagini_profilo/user29/profile.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (28, 'FrancescoNuovo', '$2a$10$PvG54TMM7HllCeMgPk/gSeP9Ot/1e6GoljTieRCX/rBBLXQNJuGVy', 'fra@gmail.com', 'Iguane che lottano
', 'http://localhost:3000/immagini_profilo/user28/profile.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (9999, 'debug', 'debug', 'debug@gmail.com', 'Hello! I love playing Hue Domino', '../immagini_profilo/default.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (30, 'Prova2', '$2a$10$YN3c07k/dgO7BiSPzvqR7eqLoVl.nziVnaXf2/CbpRsU1uHq6Vy52', 'gmail@gmail.com', 'Ciao sto presentanto', 'http://localhost:3000/immagini_profilo/user30/profile.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (31, 'Prova4', '$2a$10$WcxhPYGYJSVWjJt6j8An3OAqu7JPey6F21c8M5E2kzIBX2kfE2yJ.', 'gamil@gmail.com', 'Hello! I love playing Hue Domino', '../immagini_profilo/default.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (32, 'Prova5', '$2a$10$9yA1PNNNssJfM.BtTeFcJeX/btmZm3ZgQ0BcpcZFum5ektQ4OIF6e', 'ciao@gmail.com', 'Hello! I love playing Hue Domino', 'http://localhost:3000/immagini_profilo/user32/profile.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (33, 'Prova6', '$2a$10$GXdsfJAzLflQC3CPnmDvSOm1e7kySY/2.5I4vSjnHTAkUczSthzua', 'ciaqwwo@gmail.com', 'Hello! I love playing Hue Domino', 'http://localhost:3000/immagini_profilo/user33/profile.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (34, 'Prova10', '$2a$10$WwXY.Ma.pm5QCVCoz3iOx.rupnYU3uwfyul284By2LvGPsOS.OBhi', 'prova10@gmail.com', 'Hello! I love playing Hue Domino', 'http://localhost:3000/immagini_profilo/user34/profile.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (24, 'mamma', '$2b$10$JmE/RLhCUjlyHsc5Sg46QeIrhqLJyPYquTp8tN4PLgnn69.bRAWlq', 'luciac.73@gmail.com', 'Francesco è pronta la cena', 'http://localhost:3000/immagini_profilo/user24/profile.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (35, 'Prova11', '$2a$10$IIU9SkDfG3Hun5CRCA5a2.3KMc8HTHJUQTqDa2RVL6Oh8VOvmTE2C', 'prova11@gmail.com', 'Hello! I love playing Hue Domino', '../immagini_profilo/default.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (25, 'papa', '$2b$10$kYFMgzUk6wViwKZCiOP6ZOpb/ZZ/6zaRQlmLgQyeOLsEbUdFlZBGe', 'alessandro.cap10@gmail.com', 'Porcoddio ma come tocca fa co sta squadra de pippe', 'http://localhost:3000/immagini_profilo/user25/profile.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (26, 'Lorenzo', '$2b$10$amCYOHDJyUHAUIaNgXa5euViHJL/IBG6VNchplAp0tUx/MF7ZQMey', 'lorog@mail.com', 'Fuori il bolscevismo da questo paese', 'http://localhost:3000/immagini_profilo/user26/profile.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (36, 'Prova14', '$2a$10$p6.GxbH5Vy69TQ11Sx4BMerqHDFTv0/BTqVDO4WEN5cmkXgFQMUpO', 'prova14@gmail.com', 'Hello! I love playing Hue Domino', '../immagini_profilo/default.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (27, 'Fiuto3', '$2b$10$.FiPWQ2qGolAgnNgDDz63O1BzM9j5syLgulD4FUGQ8.z.ldUb0GfG', 'fiuto@gmail.com', 'Esco piu spesso dei miei padroni ', 'http://localhost:3000/immagini_profilo/user27/profile.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (39, 'Camilla', '$2a$10$U2nL/H4Bvgqf/nH234s1M.Wn5qKENTzNxfKbhQcQIGorYn18FR2Hi', 'cami@gmail.com', 'Hello! I love playing Hue Domino', 'http://localhost:3000/immagini_profilo/user39/profile.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (40, 'Prova15', '$2a$10$dlnWwDnNfMWCemFPRmA9g.sJywIJX4XUiA7lUTxc/dgxBkldkfGmG', 'prova12@gmail.com', 'Hello! I love playing Hue Domino', '../immagini_profilo/default.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (41, 'Francesco12', '$2a$10$Aa0oWMQX4R2EYR0pVRWoX.fxuBZzRNOFh3uaqn6mkHlaB6owL5w/O', 'prova16@gmail.com', 'Ciao presentazione!!
', 'http://localhost:3000/immagini_profilo/user41/profile.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (7, 'Francesco', '$2a$10$vu7NXwtdAQNFYD99/xtYleYrATFnbouYGhR1Ue1PiLIH8o75gczVK', 'gesco122002@gmail.com', 'Ho creato questo gioco con tanta fatica
 ', 'http://localhost:3000/immagini_profilo/user7/profile.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (37, 'Prova13', '$2a$10$2/UrKBJrf2ESNdBLdRSqQOvNOyZ.w9S202Dx6htFbiFvFS4Be0F7O', 'prova13@gmail.com', 'Hello! I love playing Hue Domino', '../immagini_profilo/default.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (38, 'Federico', '$2a$10$mK3nFERGYB51yK3EsRga1OVMrSDIFVp0kOEFm7BSdwDA.DOvojp1a', 'federico@gmail.com', 'Hello! I love playing Hue Domino', 'http://localhost:3000/immagini_profilo/user38/profile.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (44, 'Prova19', '$2a$10$lUc4DmnowEVrHuz0e8pFvODUCAy/hSpajZfSkc1Zi13tK8MQNr4ue', 'prova19@gmail.com', 'presentazione', 'http://localhost:3000/immagini_profilo/user44/profile.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (42, 'Prova17', '$2a$10$AvDCpAyO6e3/iukxVCYQW.jYJhTGlad1IblsuLY0eLNO5r0VPD1yi', 'prova17@gmail.com', 'Presentazione
', 'http://localhost:3000/immagini_profilo/user42/profile.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (43, 'Prova18', '$2a$10$E1u5p1VKo0PGBgwcHm6BxO0d7smTy.AhVmitlVB6R0ian0WAkPJ7W', 'prova18@gmail.com', 'Presentazione', 'http://localhost:3000/immagini_profilo/user43/profile.png');
INSERT INTO public.users (id, username, password, email, description, path_to_profile_picture) VALUES (45, 'Prova20', '$2a$10$OcuDOwhHpNfnTInDPf8SCucwcFGdfgmsWawa/DBwD1i87kmGDhkWu', 'prova20@gmail.com', 'Presentazione', 'http://localhost:3000/immagini_profilo/user45/profile.png');


--
-- TOC entry 3652 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 45, true);


--
-- TOC entry 3484 (class 2606 OID 16776)
-- Name: friendship friendship_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friendship
    ADD CONSTRAINT friendship_pkey PRIMARY KEY (userid1, userid2);


--
-- TOC entry 3476 (class 2606 OID 16691)
-- Name: levels level_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.levels
    ADD CONSTRAINT level_pkey PRIMARY KEY (num, nation);


--
-- TOC entry 3480 (class 2606 OID 16748)
-- Name: passed passed_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.passed
    ADD CONSTRAINT passed_unique UNIQUE (userid, levelnumber, levelnation);


--
-- TOC entry 3478 (class 2606 OID 16738)
-- Name: playable playable_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playable
    ADD CONSTRAINT playable_unique UNIQUE (userid, levelnumber, levelnation);


--
-- TOC entry 3482 (class 2606 OID 16760)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (session_id);


--
-- TOC entry 3470 (class 2606 OID 16686)
-- Name: users unique_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- TOC entry 3472 (class 2606 OID 16681)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3474 (class 2606 OID 16683)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 3493 (class 2620 OID 16768)
-- Name: users add_to_playable; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER add_to_playable AFTER INSERT ON public.users FOR EACH ROW EXECUTE FUNCTION public.add_user_to_playable();


--
-- TOC entry 3494 (class 2620 OID 16746)
-- Name: passed add_to_playable_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER add_to_playable_trigger AFTER INSERT ON public.passed FOR EACH ROW EXECUTE FUNCTION public.add_to_playable();


--
-- TOC entry 3491 (class 2606 OID 16777)
-- Name: friendship friendship_userid1_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friendship
    ADD CONSTRAINT friendship_userid1_fkey FOREIGN KEY (userid1) REFERENCES public.users(id);


--
-- TOC entry 3492 (class 2606 OID 16782)
-- Name: friendship friendship_userid2_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friendship
    ADD CONSTRAINT friendship_userid2_fkey FOREIGN KEY (userid2) REFERENCES public.users(id);


--
-- TOC entry 3487 (class 2606 OID 16732)
-- Name: passed passed_levelnumber_levelnation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.passed
    ADD CONSTRAINT passed_levelnumber_levelnation_fkey FOREIGN KEY (levelnumber, levelnation) REFERENCES public.levels(num, nation);


--
-- TOC entry 3488 (class 2606 OID 16739)
-- Name: passed passed_playable_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.passed
    ADD CONSTRAINT passed_playable_fk FOREIGN KEY (userid, levelnumber, levelnation) REFERENCES public.playable(userid, levelnumber, levelnation);


--
-- TOC entry 3489 (class 2606 OID 16727)
-- Name: passed passed_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.passed
    ADD CONSTRAINT passed_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);


--
-- TOC entry 3485 (class 2606 OID 16711)
-- Name: playable playable_levelnumber_levelnation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playable
    ADD CONSTRAINT playable_levelnumber_levelnation_fkey FOREIGN KEY (levelnumber, levelnation) REFERENCES public.levels(num, nation);


--
-- TOC entry 3486 (class 2606 OID 16706)
-- Name: playable playable_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playable
    ADD CONSTRAINT playable_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);


--
-- TOC entry 3490 (class 2606 OID 16761)
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2024-05-24 15:53:42 CEST

--
-- PostgreSQL database dump complete
--

