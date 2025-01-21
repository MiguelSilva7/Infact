import React, { useState, useEffect, useCallback } from "react";
import useAdvertisementsStore from "../stores/advertisementsStore";
import { insert } from "../services/genericService";
import { getPersonByEmail } from "../services/peopleService";
import { useAuthStore } from "../stores/authStore";
import { getById } from "../services/genericService";
import {
  checkIfPersonAlreadyApplied,
  checkIfUserAlreadyApplied,
} from "../services/jobApplicationsService";
import DialogBox from "./DialogBox";

const ApplyForm = ({ closeForm }) => {
  const { focusedAdvertisement } = useAdvertisementsStore();
  const { token, isAuthenticated } = useAuthStore();
  const [user, setUser] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState("false");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
  });

  const getUser = useCallback(async () => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const user = await getById("user", payload.id, token);
    setUser(user);
  }, [token]);

  useEffect(() => {
    if (isAuthenticated) {
      getUser();
    }
  }, [getUser, isAuthenticated]);

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    if (isAuthenticated && user != null) {
      setFormData({ ...formData, ...user });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user, setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedDatas = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedDatas);
    localStorage.setItem("formData", JSON.stringify(updatedDatas));
  };

  const checkFormValidity = () => {
    const { first_name, last_name, email, phone, message } = formData;

    const errors = {};

    if (!first_name.trim()) {
      errors.first_name = "First name is required.";
    } else if (first_name.length < 2) {
      errors.first_name = "First name must be at least 2 characters long.";
    }

    if (!last_name.trim()) {
      errors.last_name = "Last name is required.";
    } else if (last_name.length < 2) {
      errors.last_name = "Last name must be at least 2 characters long.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!emailPattern.test(email)) {
      errors.email = "Email is not valid.";
    }

    const phonePattern = /^\d{10}$/;
    if (!phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!phonePattern.test(phone)) {
      errors.phone = "Phone number must be 10 digits long.";
    }

    if (!message.trim()) {
      errors.message = "Message is required.";
    } else if (message.length < 50) {
      errors.message = "Message must be at least 50 characters long.";
    }

    if (Object.keys(errors).length > 0) {
      return {
        isValid: false,
        errors,
      };
    } else {
      return {
        isValid: true,
        errors: {},
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkFormValidity().isValid) {
      console.log("formulaire invalide");
      console.log(checkFormValidity().errors);
      return;
    }
    if (isAuthenticated) {
      const alreadyApplied = await checkIfUserAlreadyApplied(
        focusedAdvertisement.id,
        user.id,
        token,
      );
      if (alreadyApplied) {
        console.log("L'utilisateur a déjà postulé à cette annonce");
        setShowDialog(true);
        setMessage("Vous avez déjà postulé à cette annonce");
        return;
      }
      try {
        const jobApplication = {
          advertisement_id: focusedAdvertisement.id,
          status: "applied",
          email: user.email,
          user_id: user.id,
        };
        await insert("job_application", jobApplication);
        console.log("formulaire envoyé");
        setShowDialog(true);
        setMessage("Candidature envoyée");
      } catch (error) {
        setShowDialog(true);
        setMessage("Une erreur est survenue");
        console.log("Erreur lors de l'insertion de la candidature :", error);
      }
    } else {
      let people = null;
      try {
        people = await getPersonByEmail(formData.email, token);
      } catch (error) {
        console.log("Error : ", error);
      }

      if (people) {
        const alreadyApplied = await checkIfPersonAlreadyApplied(
          focusedAdvertisement.id,
          people.id,
          token,
        );

        if (alreadyApplied) {
          console.log("L'utilisateur a déjà postulé à cette annonce");
          setShowDialog(true);
          setMessage("Vous avez déjà postulé à cette annonce");
          return;
        }
        try {
          const jobApplication = {
            advertisement_id: focusedAdvertisement.id,
            status: "applied",
            email: formData.email,
            person_id: people.id,
          };
          await insert("job_application", jobApplication, token);
          console.log("formulaire envoyé");
          setShowDialog(true);
          setMessage("Candidature envoyée");
        } catch (error) {
          setShowDialog(true);
          setMessage("Une erreur est survenue");
          console.log("Erreur lors de l'insertion de la candidature :", error);
        }
      } else {
        try {
          const people = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            phone: formData.phone,
          };
          const newPeople = await insert("person", people, token);

          const jobApplication = {
            advertisement_id: focusedAdvertisement.id,
            status: "applied",
            email: formData.email,
            person_id: newPeople.id,
          };
          await insert("job_application", jobApplication);
          setShowDialog(true);
          setMessage("Candidature envoyée");
          console.log("formulaire envoyé pour le nouvel utilisateur");
        } catch (error) {
          setShowDialog(true);
          setMessage("Une erreur est survenue");
          console.log(
            "Erreur lors de l'insertion de l'utilisateur ou de la candidature :",
            error,
          );
        }
      }
    }
  };

  return (
    <div className="neobrutalism absolute left-0 top-0 h-full w-full rounded-md bg-white p-6">
      {showDialog && (
        <DialogBox callback={() => setShowDialog(false)} message={message} />
      )}
      <form
        onSubmit={handleSubmit}
        className="flex h-full w-full flex-col gap-2 [&>div>*]:grow [&>div>*]:rounded-md [&>div>*]:outline-none [&>div>input]:border [&>div>input]:border-black [&>div>input]:px-4 [&>div>input]:py-2 [&>div>label]:basis-1/2 [&>div>textarea]:border [&>div>textarea]:border-black [&>div>textarea]:p-4 [&>div]:flex [&>div]:items-center [&>div]:justify-between [&>div]:gap-4 [&>div]:rounded-md [&>div]:border [&>div]:border-black [&>div]:p-4"
      >
        <div className="bg-myviolet small-neobrutalism box-border">
          <label htmlFor="first-name-id">First name</label>
          <input
            value={formData.first_name}
            onChange={handleChange}
            id="first-name-id"
            name="first_name"
            type="text"
            className="focus:-m-[1px] focus:border-[2px]"
          ></input>
        </div>
        <div className="bg-myviolet small-neobrutalism">
          <label htmlFor="last-name-id">Last name</label>
          <input
            value={formData.last_name}
            onChange={handleChange}
            id="last-name-id"
            name="last_name"
            type="text"
            className="focus:-m-[1px] focus:border-[2px]"
          ></input>
        </div>
        {!isAuthenticated && (
          <div className="bg-myviolet small-neobrutalism">
            <label htmlFor="email-id">Email</label>
            <input
              value={formData.email}
              onChange={handleChange}
              id="email-id"
              name="email"
              type="email"
              className="focus:-m-[1px] focus:border-[2px]"
            ></input>
          </div>
        )}

        <div className="bg-myviolet small-neobrutalism">
          <label htmlFor="phone-id">Phone number</label>
          <input
            value={formData.phone}
            onChange={handleChange}
            id="phone-id"
            name="phone"
            type="tel"
            className="focus:-m-[1px] focus:border-[2px]"
          ></input>
        </div>
        <div className="bg-myviolet small-neobrutalism grow-[2]">
          <label htmlFor="message-id">Message</label>
          <textarea
            onChange={handleChange}
            value={formData.message}
            name="message"
            style={{ resize: "none" }}
            className="h-full focus:-m-[1px] focus:border-[2px]"
            id="message-id"
          ></textarea>
        </div>
        <div className="-mx-4 flex justify-between border-none">
          <button
            className="small-neobrutalism small-neobrutalism-hover rounded-md bg-blue-500 px-3 py-2 text-white transition-all duration-300 hover:bg-blue-400"
            type="submit"
          >
            Envoyer
          </button>
          <div
            onClick={closeForm}
            className="small-neobrutalism small-neobrutalism-hover bg-myred cursor-pointer rounded-md px-3 py-2 text-center text-white transition-all duration-300"
          >
            Annuler
          </div>
        </div>
      </form>
    </div>
  );
};

export default ApplyForm;
