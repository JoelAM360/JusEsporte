import React, { useState } from "react";
import { LayoutDashboard } from "../Layout.Dashboard";
import { Link } from "react-router-dom";
import { Rankings } from "../../Home/Rankings";

export const Classificacao = () => {

  return (
    <LayoutDashboard>
      <Rankings />
    </LayoutDashboard>
  );
};
