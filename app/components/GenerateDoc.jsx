"use client";
import { useState } from "react";

const GenerateDoc = () => {
  const [name, setName] = useState("");
  const [eno, setEno] = useState("");
  const [year, setYear] = useState("2023/24");
  const [branch, setBranch] = useState("Computer Engineering");
  const [method, setMethod] = useState("Central Admissions Committee");
  const [fee, setFee] = useState(28300);
  const [is_admitted, setIsAdmitted] = useState("admitted");
  const [gender, setGender] = useState("male");
  const branchOptions = [
    "Computer Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Electronics and Communication Engineering",
  ];
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name,
      eno,
      year,
      branch,
      method,
      fee,
      is_admitted,
      gender,
    };

    if (
      confirm(
        `> Are you sure you want to generate the word document? \nName: ${name} \nEno: ${eno} \nYear: ${year} \nBranch: ${branch} \nMethod: ${method} \nFee: ${fee} \nIs admitted: ${is_admitted} \nGender: ${gender}`
      )
    ) {
      const response = await fetch("http://127.0.0.1:5000/generate-doc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "mysy-form.pdf");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        console.log("Word document generated successfully!");
      } else {
        console.error("Failed to generate Word document");
      }
    }
  };

  return (
    <div className="flex md:flex-row flex-col mx-5 bg-white gap-3 rounded-3xl p-5 drop-shadow-md ">
      <form
        onSubmit={handleSubmit}
        className=" gap-3 p-5 drop-shadow-md md:w-2/3  shadow-black text-balance text-justify"
      >
        <div className="text-3xl font-extrabold">
          Fill this form for MYSY fresh certificate
        </div>
        <br />
        This is to certify that{" "}
        <select name="gender" id="" onChange={(e) => setGender(e.target.value)}>
          <option value="male">Mr. </option>
          <option value="female">Ms. </option>
        </select>{" "}
        <input
          placeholder="Your name here"
          type="text"
          onChange={(e) => setName(e.target.value)}
          className="input"
        />{" "}
        Enrollment No.{" "}
        <input
          placeholder="Your enrollment number here"
          type="text"
          onChange={(e) => setEno(e.target.value)}
          className="input"
        />{" "}
        is studying in{" "}
        <select
          name="branch"
          defaultValue={branch[0]}
          onChange={(e) => setBranch(e.target.value)}
          id=""
        >
          {branchOptions.map((item) => {
            return (
              <option value={item} key={item}>
                {item}
              </option>
            );
          })}
        </select>{" "}
        course of our institute in Diploma in the academic year
        <select name="year" id="" onChange={(e) => setYear(e.target.value)}>
          <option value="2024-25">2024-25</option>
          <option value="2025-26">2025-26</option>
        </select>
        , through the{" "}
        <select
          name="admitted-by"
          id=""
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="Central Admissions Committee">
            Central Admissions Committee
          </option>
          <option value="Vacant Quota(Government)">
            Vacant Quota(Government)
          </option>
        </select>{" "}
        in our institute in first year. {gender == "male" ? "Mr." : "Ms."}{" "}
        {name} has not got admission on the NRI seat.{" "}
        {gender == "male" ? "He " : "She "} has paid Rs 28,000/- tuition fees in
        Sem 1. Our institute has self finance hostel facility.{" "}
        {gender == "male" ? "Mr." : "Ms."} {name} has been{" "}
        <select
          name="hosteler"
          id=""
          onChange={(e) => setIsAdmitted(e.target.value)}
        >
          <option value="admitted">admitted</option>
          <option value="not admitted">not admitted</option>
        </select>{" "}
        in our hostel.
        <br />
        <input
          type="submit"
          value="Generate Document"
          className="bg-indigo-700 text-white rounded-xl p-3 m-3"
        />
      </form>
      <div className="bg-indigo-700 text-white flex flex-col p-5 rounded-xl">
        <div className="text-3xl">Instructions</div>
        <div>Enter your name according to the 10th marksheet.</div>
        <div>Verify the information twice before submitting.</div>
        <br />
        <div className="text-3xl">Note</div>
        <div>Std 10 marksheet.</div>
        <div>School leaving certificate.</div>
        <div>ACPDC admission letter.</div>
        <div>Fee receipt (total 28,000).</div>
        <div>If hosteler, hostel fee receipt.</div>
        <br />
        <hr />
        <br />
        <div>
          Kindly submit these documents,along with the application form
          generated by clicking the button, in admin office.
        </div>
      </div>
    </div>
  );
};

export default GenerateDoc;
