"use client";
import { useEffect, useState } from "react";
import sendEmail from "../re/email";

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
  const [branch, setBranch] = useState(branchOptions[0]);
  const [acadYear, setAcadYear] = useState("2023/24");
  const [amount, setAmount] = useState("");
  const [preAcadYear, setPreAcadYear] = useState("2023/24");
  const [attenDuringYear, setAttenDuringYear] = useState("2023");
  const [admitted, setAdmitted] = useState("admitted");
  const [feePaid, setFeePaid] = useState("28000");
  const [inSemester, setInSemester] = useState("3");
  const [passedYear1, setPassedYear1] = useState("");
  const [percent, setPercent] = useState("");
  const [spi1, setSpi1] = useState("");
  const [passedSem1, setPassedSem1] = useState("");
  const [atm1, setAtm1] = useState("first");
  const [spi2, setSpi2] = useState("");
  const [passedSem2, setPassedSem2] = useState("");
  const [atm2, setAtm2] = useState("first");
  const [cpi, setCpi] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    const tempYear = inSemester === "3" ? "first" : "second";
    const sem1 = inSemester === "3" ? "first" : "third";
    const sem2 = inSemester === "3" ? "second" : "fourth";
    const percentValue = ((cpi - 0.5) * 10).toFixed(2);
    const feeFinal = inSemester === "3" ? "27300" : "26000";
    const newAcadYear = inSemester === "3" ? "2023/24" : "2022/23";
    setData({
      name: name,
      enrollment_number: eno,
      academic_year: newAcadYear,
      branch: branch,
      amount: amount,
      previous_academic_year: preAcadYear,
      attendance_during_year: attenDuringYear,
      fee_paid: feeFinal,
      gender: gender,
      hosteler: admitted,
      passing_year_1: tempYear,
      spi_1: spi1,
      attempts_1: atm1,
      passing_sem_1: sem1,
      spi_2: spi2,
      passing_sem_2: sem2,
      attempts_2: atm2,
      percentile_1: percentValue,
      in_semester: inSemester,
    });
  }, [
    name,
    eno,
    acadYear,
    branch,
    amount,
    preAcadYear,
    attenDuringYear,
    feePaid,
    gender,
    admitted,
    inSemester,
    cpi,
    spi1,
    atm1,
    spi2,
    atm2,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        const buffer = await blob.arrayBuffer();
        const bufferContent = Buffer.from(buffer);
        const base64Content = bufferContent.toString("base64");
        const date = new Date();
        const year = date.getFullYear();
        sendEmail(base64Content, eno, year); // Pass eno directly to sendEmail
    
        // Instead of creating a Blob and downloading it directly, handle the base64 content
        // Decode the base64 content on the client-side to display the PDF
        const pdfData = "data:application/pdf;base64," + base64Content;
        window.open(pdfData); // Display the PDF to the user
    
        console.log("PDF file processed successfully!");
    } else {
        console.error("Failed to process the PDF file");
    }
    }
  };

  return (
    <div className="flex  flex-col md:flex-row mx-5 bg-white gap-3 rounded-3xl p-5 drop-shadow-md ">
      <form
        onSubmit={handleSubmit}
        style={{ lineHeight: 1.5 }}
        className=" gap-3 md:w-5/6  p-5   drop-shadow-md      shadow-black  "
      >
        Name of student{" "}
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
        <br />
        Enrollment No{" "}
        <input
          type="text"
          onChange={(e) => setEno(e.target.value)}
          placeholder="Your enrollment number here"
        />{" "}
        <br />
        Branch{" "}
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
        <br />
        Scholarship recieved last year{" "}
        {/* <input
          type="text"
          placeholder="amount"
          onChange={(e) => setAmount(e.target.value)}
        /> */}
        <select
          name=""
          id=""
          defaultValue={"25,000/-"}
          onChange={(e) => setAmount(e.target.value)}
        >
          <option value="25,000/-">25,000/-</option>
          <option value="28,000/-">28,000/-</option>
          <option value="37,000/-">37,000/-</option>
          <option value="40,000/-">40,000/-</option>
        </select>
        under MYSY during year {preAcadYear}
        {/* <input
          type="text"
          onChange={(e) => setPreAcadYear(e.target.value)}
          placeholder="ex. 2023"
        />{" "} */}
        . <br /> You are
        <select
          name="admitted"
          defaultValue="admitted"
          onChange={(e) => setAdmitted(e.target.value)}
          id=""
        >
          <option value="admitted">admitted</option>
          <option value="not admitted">not admitted</option>
        </select>{" "}
        in our hostel. <br /> You have paid Rs.
        {inSemester === "3" ? "27,300/-" : "26,000/-"} of tuition fees in{" "}
        {/* <input
          type="text"
          placeholder="1"
          onChange={(e) => setInSemester(e.target.value)}
        /> */}
        <select
          name="passed"
          id=""
          defaultValue="3"
          onChange={(e) => setInSemester(e.target.value)}
        >
          <option value="3">third</option>
          <option value="5">fifth</option>
        </select>{" "}
        semester .
        <br />
        <div className="text-2xl text-bold">Result</div>
        {/* <select type="text" onChange={(e) => setPassedYear1(e.target.value)}>
          <option value="first">first</option>
          <option value="second">second</option>
        </select>{" "} */}{" "}
        Your current CPI{" "}
        <input
          type="text"
          placeholder={` ${
            inSemester === "3" ? "CPI of sem 2" : "CPI of sem 4"
          }`}
          onChange={(e) => setCpi(e.target.value)}
        />{" "}
        <br />
        {inSemester === "3" ? "First" : "Third"} semester SPI{" "}
        <input
          type="text"
          placeholder={`${inSemester === "3" ? "Sem 1 SPI" : "Sem 3 SPI"}`}
          onChange={(e) => setSpi1(e.target.value)}
        />{" "}
        {/* <select
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
        </select>{" "} */}
        with{" "}
        <select
          type="text"
          defaultValue="first"
          onChange={(e) => setAtm1(e.target.value)}
        >
          <option value="first">first attempt</option>
          <option value="second">second attempt</option>
        </select>{" "}
        <br />
        {inSemester === "3" ? "Second" : "Fourth"} semester SPI{" "}
        <input
          type="text"
          placeholder={`${inSemester === "3" ? "Sem 2 SPI" : "Sem 4 SPI"}`}
          onChange={(e) => setSpi2(e.target.value)}
        />{" "}
        {/* <select
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
        </select>{" "} */}{" "}
        with
        {/* <input
          type="text"
          placeholder="first"
          onChange={(e) => setAtm2(e.target.value)}
        />{" "} */}
        <select
          type="text"
          defaultValue="first"
          onChange={(e) => setAtm2(e.target.value)}
        >
          <option value="first">first attempt</option>
          <option value="second">second attempt</option>
        </select>{" "}
        <br />
        <input
          type="submit"
          value="Submit"
          className="bg-indigo-700 text-white rounded-xl p-3 m-3"
        />
      </form>
      <div className="bg-indigo-700 text-white flex flex-col p-5 rounded-xl">
        <div className="text-3xl">Instructions</div>
        <div>Enter your name according to the GTU Profile..</div>
        <div>Verify the information twice before submitting.</div>
        <br />
        <div className="text-3xl">Note</div>
        <div>Last year marksheets.</div>
        <div>Current SEM fee reciept</div>
        <div>If admitted in hostel, hostel fee receipt.</div>
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
