"use client";
import { useState } from "react";

const GenerateDoc2 = () => {
  const branchOptions = [
    "Computer Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Electronics and Communication Engineering",
  ];
  const [gender, setGender] = useState("male");
  const [name, setName] = useState("");
  const [eno, setEno] = useState("");
  const [branch, setBranch] = useState(branchOptions[0]); // Assuming branchOptions is defined elsewhere
  const [acadYear, setAcadYear] = useState("2023/24");
  const [amount, setAmount] = useState("");
  const [preAcadYear, setPreAcadYear] = useState("2023");
  const [attenDuringYear, setAttenDuringYear] = useState("2023");
  const [admitted, setAdmitted] = useState("admitted");
  const [feePaid, setFeePaid] = useState("28000");
  const [inSemester, setInSemester] = useState("");
  const [passedYear1, setPassedYear1] = useState("");
  const [percent, setPercent] = useState("");
  const [spi1, setSpi1] = useState("");
  const [passedSem1, setPassedSem1] = useState("");
  const [atm1, setAtm1] = useState("");
  const [spi2, setSpi2] = useState("");
  const [passedSem2, setPassedSem2] = useState("");
  const [atm2, setAtm2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      enrollment_number: eno,
      academic_year: acadYear, // corrected variable name
      branch: branch,
      amount: amount,
      previous_academic_year: preAcadYear,
      attendance_during_year: attenDuringYear, // corrected variable name
      fee_paid: feePaid, // corrected variable name
      gender: gender,
      hosteler: admitted,
      passing_year_1: passedYear1,
      spi_1: spi1,
      attempts_1: atm1,
      passing_sem_1: passedSem1,
      spi_2: spi2,
      passing_sem_2: passedSem2,
      attempts_2: atm2,
      percentile_1: percent,
      in_semester: inSemester,
    };
    if (confirm(`> Are you sure you want to generate the word document?`)) {
      const response = await fetch("http://127.0.0.1:5000/test", {
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
        link.setAttribute("download", "output.pdf");
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
    <div className="flex  flex-col mx-5 bg-white gap-3 rounded-3xl p-5 drop-shadow-md ">
      <form
        onSubmit={handleSubmit}
        className=" gap-3 p-5 drop-shadow-md      shadow-black  "
      >
        This is to certify that{" "}
        <select
          name="gender"
          defaultValue="male"
          id=""
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="male"> Mr.</option>
          <option value="female"> Ms.</option>
        </select>{" "}
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name here"
        />
        Enrollment No{" "}
        <input
          type="text"
          onChange={(e) => setEno(e.target.value)}
          placeholder="Your enrollment number here"
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
        course of our institute after taking admission in first year during
        academic year{" "}
        <input
          type="text"
          placeholder="2023/24"
          onChange={(e) => setAcadYear(e.target.value)}
        />{" "}
        {gender == "male" ? "Mr." : "Ms."} {name} has got Rs.{" "}
        <input
          type="text"
          placeholder="amount"
          onChange={(e) => setAmount(e.target.value)}
        />
        scholarship under ‘Mukhyamantri Yuva Swavalamban Yojana’ during year
        <input
          type="text"
          onChange={(e) => setPreAcadYear(e.target.value)}
          placeholder="ex. 2023"
        />{" "}
        . {gender == "male" ? "Mr." : "Ms."} {name} is not given/receiving any
        other scholarship as per institute records. There is no serious
        disciplinary action against {gender == "male" ? "Mr." : "Ms."} {name} as
        per the educational institute regulations or moral grounds.{" "}
        {gender == "male" ? "He" : "She"} has 75% or more attendance. Our
        Institute has Government/ Grant in aid/Self finance Hostel Facility.
        {gender == "male" ? "Mr." : "Ms."} {name} has been{" "}
        <select
          name="admitted"
          defaultValue="admitted"
          onChange={(e) => setAdmitted(e.target.value)}
          id=""
        >
          <option value="admitted">admitted</option>
          <option value="not admitted">not admitted</option>
        </select>{" "}
        in our hostel. {gender == "male" ? "He " : "She "} has paid Rs.
        <input
          type="text"
          placeholder="28000"
          onChange={(e) => setFeePaid(e.target.value)}
        />{" "}
        of tuition fees in semester{" "}
        <input
          type="text"
          placeholder="1"
          onChange={(e) => setInSemester(e.target.value)}
        />
        . {gender == "male" ? "Mr. " : "Ms. "} {name} has passed
        <select type="text" onChange={(e) => setPassedYear1(e.target.value)}>
          <option value="first">first</option>
          <option value="second">second</option>
        </select>{" "}
        year exam obtaining{" "}
        <input
          type="text"
          placeholder="10 SPI"
          onChange={(e) => setSpi1(e.target.value)}
        />{" "}
        out of 10 in{" "}
        <select
          type="text"
          placeholder="first"
          onChange={(e) => setPassedSem1(e.target.value)}
        >
          <option value="first">first</option>
          <option value="second">second</option>
          <option value="third">third</option>
          <option value="fourth">fourth</option>
          <option value="fifth">fifth</option>
          <option value="sixth">sixth</option>
        </select>{" "}
        semester with{" "}
        <input
          type="text"
          placeholder="first"
          onChange={(e) => setAtm1(e.target.value)}
        />{" "}
        attempt and{" "}
        <input
          type="text"
          placeholder="10 SPI"
          onChange={(e) => setSpi2(e.target.value)}
        />{" "}
        out of 10 in{" "}
        <select
          type="text"
          placeholder="first"
          onChange={(e) => setPassedSem2(e.target.value)}
        >
          <option value="first">first</option>
          <option value="second">second</option>
          <option value="third">third</option>
          <option value="fourth">fourth</option>
          <option value="fifth">fifth</option>
          <option value="sixth">sixth</option>
        </select>{" "}
        semester with
        <input
          type="text"
          placeholder="first"
          onChange={(e) => setAtm2(e.target.value)}
        />{" "}
        attempt.
        <br />
        <input type="submit" value="Submit" className="btn" />
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

export default GenerateDoc2;
