// Libraries
import React from "react";

// Components
import ShortnameForm from "./components/shortname-form";
import AdminForm from "./components/admin-form";
import PrivacyForm from "./components/privacy-form";
import DeleteForm from "./components/delete-form";

const SettingsForm = ({ pid }) => (
  <page>
    <h2>Settings</h2>
    <hr />
    <ShortnameForm />
    <AdminForm />
    <PrivacyForm />
    <DeleteForm pid={pid} />
  </page>
);

export default SettingsForm;
