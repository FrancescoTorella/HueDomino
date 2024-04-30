--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-04-30 13:34:23 CEST

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
-- TOC entry 221 (class 1255 OID 16744)
-- Name: add_to_playable(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.add_to_playable() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO playable (userid, levelnumber, levelNation) VALUES (NEW.userid, NEW.levelnumber + 1, NEW.levelNation);
  RETURN NEW;
END;
$$;


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
-- TOC entry 3641 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3461 (class 2604 OID 16677)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3632 (class 0 OID 16687)
-- Dependencies: 217
-- Data for Name: levels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.levels (num, nation) FROM stdin;
1	italy
2	italy
3	italy
4	italy
5	italy
6	italy
7	italy
8	italy
\.


--
-- TOC entry 3634 (class 0 OID 16724)
-- Dependencies: 219
-- Data for Name: passed; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.passed (userid, levelnumber, levelnation) FROM stdin;
7	1	italy
7	2	italy
7	3	italy
7	4	italy
7	5	italy
7	6	italy
7	7	italy
24	1	italy
24	2	italy
\.


--
-- TOC entry 3633 (class 0 OID 16703)
-- Dependencies: 218
-- Data for Name: playable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.playable (userid, levelnumber, levelnation) FROM stdin;
7	1	italy
9	1	italy
13	1	italy
17	1	italy
18	1	italy
19	1	italy
20	1	italy
21	1	italy
22	1	italy
23	1	italy
7	2	italy
7	3	italy
7	4	italy
7	5	italy
7	6	italy
7	7	italy
7	8	italy
24	1	italy
24	2	italy
24	3	italy
\.


--
-- TOC entry 3635 (class 0 OID 16755)
-- Dependencies: 220
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (session_id, user_id, created_at, expires_at) FROM stdin;
f0204f9c-9a12-4409-bf8a-2266432cf663	7	2024-04-28 17:52:12.69278	2024-04-28 18:52:12.692
7269536a-b42a-40c0-bfb0-5862e0d7ed13	24	2024-04-29 15:46:45.860243	2024-04-29 16:46:45.86
4aac3c53-3a1e-49f1-a6c7-0c037dbf651d	7	2024-04-29 16:16:23.585932	2024-04-29 17:16:23.585
ec2ffbe4-e423-4ec4-a263-fb433f3e24c4	7	2024-04-29 16:17:50.425573	2024-04-29 17:17:50.425
9e2f1546-46f1-479c-9ad4-601856357247	24	2024-04-29 22:18:52.084259	2024-04-29 23:18:52.083
488e95e7-02dc-42f2-b4a6-7e3869e23744	7	2024-04-30 07:53:46.591997	2024-04-30 08:53:46.591
\.


--
-- TOC entry 3631 (class 0 OID 16674)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, email, description, path_to_profile_picture) FROM stdin;
7	Francesco	$2b$10$hvKSLuQ53KooGamYbDO40OIh60CdL73fWYuDjwbjEgv4SB9wbof8a	gesco2002@gmail.com	Hello! I love playing Hue Domino	../immagini_profilo/default.png
9	Francesco2	$2b$10$GKLfs2dHA2ALi5LBKlCRguaG2EwGnGXy3N1EUNYvqUULNHMi5lMMO	francescotorella2002@gmail.com	Hello! I love playing Hue Domino	../immagini_profilo/default.png
13	FrancescoUni	$2b$10$wZVrwcEjgGq.srXPCWjVC.Js75Wj4nY4jPT6tQLt6lVZw2QOqON2i	torella.1984820@studenti.uniroma1.it	Hello! I love playing Hue Domino	../immagini_profilo/default.png
17	garoga123	$2b$10$PudyFLjuCDb80Xoe/VYl1.MKPWrPedLLdtuDJko0JVQnO5VJQFVrq	garoga8602@weirby.com	Hello! I love playing Hue Domino	../immagini_profilo/default.png
18	garoga123231	$2b$10$0a.GfD47LYbluU60NKkKvuRVL86hOFN4HJot4GN3rfgano0peY.VW	garogaaaa8602@weirby.com	Hello! I love playing Hue Domino	../immagini_profilo/default.png
19	FrancescoGaroga	$2b$10$X6hINPGZPkWe8gGuPxbbFO1kahbDKzwh7jnnQfDU8Ud3u7SvSMGpe	gibffim12892@msback.comf	Hello! I love playing Hue Domino	../immagini_profilo/default.png
20	FrancescoGimmi	$2b$10$sYjsCIG84PcnklHMf4zztOEbxYgDr6Z7fhk1inA6rFXZaQb6MPEqW	gibim12892@msback.com	Hello! I love playing Hue Domino	../immagini_profilo/default.png
21	FrancescoGimmiee	$2b$10$dhVTfv/kTuxhT0BCpyFzSOWw3g7sawwgC3qWTZAXtAkNuuVoh6IAa	gibwrrim12892@msback.com	Hello! I love playing Hue Domino	../immagini_profilo/default.png
22	FrancescoG	$2b$10$CCVAqLk7FqL/JnbJdmNYnup04kF1BsXvPxeQffy.mDDf/8pmJJWU2	gibfim12892@msback.com	Hello! I love playing Hue Domino	../immagini_profilo/default.png
23	Francescofg	$2b$10$EvK6jodHwOn.jvqvQ.eLTuCyEvn8igCpr3TLUocOECEj6KHFg6I4O	fdgibim12892@msback.com	Hello! I love playing Hue Domino	../immagini_profilo/default.png
24	mamma	$2b$10$JmE/RLhCUjlyHsc5Sg46QeIrhqLJyPYquTp8tN4PLgnn69.bRAWlq	luciac.73@gmail.com	Hello! I love playing Hue Domino	../immagini_profilo/default.png
\.


--
-- TOC entry 3642 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 24, true);


--
-- TOC entry 3472 (class 2606 OID 16691)
-- Name: levels level_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.levels
    ADD CONSTRAINT level_pkey PRIMARY KEY (num, nation);


--
-- TOC entry 3476 (class 2606 OID 16748)
-- Name: passed passed_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.passed
    ADD CONSTRAINT passed_unique UNIQUE (userid, levelnumber, levelnation);


--
-- TOC entry 3474 (class 2606 OID 16738)
-- Name: playable playable_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playable
    ADD CONSTRAINT playable_unique UNIQUE (userid, levelnumber, levelnation);


--
-- TOC entry 3478 (class 2606 OID 16760)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (session_id);


--
-- TOC entry 3466 (class 2606 OID 16686)
-- Name: users unique_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- TOC entry 3468 (class 2606 OID 16681)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3470 (class 2606 OID 16683)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 3485 (class 2620 OID 16768)
-- Name: users add_to_playable; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER add_to_playable AFTER INSERT ON public.users FOR EACH ROW EXECUTE FUNCTION public.add_user_to_playable();


--
-- TOC entry 3486 (class 2620 OID 16746)
-- Name: passed add_to_playable_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER add_to_playable_trigger AFTER INSERT ON public.passed FOR EACH ROW EXECUTE FUNCTION public.add_to_playable();


--
-- TOC entry 3481 (class 2606 OID 16732)
-- Name: passed passed_levelnumber_levelnation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.passed
    ADD CONSTRAINT passed_levelnumber_levelnation_fkey FOREIGN KEY (levelnumber, levelnation) REFERENCES public.levels(num, nation);


--
-- TOC entry 3482 (class 2606 OID 16739)
-- Name: passed passed_playable_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.passed
    ADD CONSTRAINT passed_playable_fk FOREIGN KEY (userid, levelnumber, levelnation) REFERENCES public.playable(userid, levelnumber, levelnation);


--
-- TOC entry 3483 (class 2606 OID 16727)
-- Name: passed passed_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.passed
    ADD CONSTRAINT passed_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);


--
-- TOC entry 3479 (class 2606 OID 16711)
-- Name: playable playable_levelnumber_levelnation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playable
    ADD CONSTRAINT playable_levelnumber_levelnation_fkey FOREIGN KEY (levelnumber, levelnation) REFERENCES public.levels(num, nation);


--
-- TOC entry 3480 (class 2606 OID 16706)
-- Name: playable playable_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playable
    ADD CONSTRAINT playable_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);


--
-- TOC entry 3484 (class 2606 OID 16761)
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2024-04-30 13:34:24 CEST

--
-- PostgreSQL database dump complete
--

