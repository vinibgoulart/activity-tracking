import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import api from "../../services/api";

import "../../styles/globals.css";

import NavBar from "../../components/Navbar";
import CardProject from "./CardProject"

export default function Home() {
    const navigate = useNavigate();

    const [projects, setProject] = useState([]);
    const [token] = useState(localStorage.getItem("token"));

    useEffect(() => {
        if (![token]) {
            localStorage.clear();
            navigate("/login");
        }

        async function fetchData() {
            api.get("/api/auth/projects", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    setProject(res.data);
                })
                .catch((err) => {
                    if (
                        err.request.status &&
                        err.request.status === (401 || 498)
                    ) {
                        localStorage.clear();
                        navigate("/login");
                    } else {
                        alert("Error");
                    }
                });
        }

        fetchData();
    }, [token]);

    const onInsertProject = (data) => {
        api.post("/api/auth/projects", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setProject([...projects], res.data);
            })
            .catch((err) => {
                if (err.status && err.status === (401 || 498)) {
                    localStorage.clear();
                    navigate("/login");
                } else {
                    alert("Error");
                }
            });
    };

    return (
        <React.Fragment>
            <NavBar />
            <CardProject onInsertProject={onInsertProject} />
        </React.Fragment>
    );
}