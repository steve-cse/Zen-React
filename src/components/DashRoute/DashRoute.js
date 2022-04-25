import React from "react";
import {  Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function DashRoute({ children }) {
  const { currentUser } = useAuth();

  return currentUser ? <Navigate to="/dashboard" />:children ;
}