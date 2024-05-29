import moment from "moment";
import styles from "./ProfileHighlights.module.css";
import { useMembers } from "../../components/contexts/MemberContext";
import Loading from "../../components/Loading";

function ProfileHighlights() {
  const { currentMember, isLoading } = useMembers();
  const member = Array.isArray(currentMember)
    ? currentMember[0]
    : currentMember;

  const formattedData = formatData(currentMember);
  const { status, base_pay, adult_pay, child_pay } =
    formattedData.membership || {};

  //Spouse array
  const spouse = formattedData.spouse || [];

  //Dob for member and spouse
  const memberDob = member.dob || {};
  const spouseDob =
    formattedData.spouse && formattedData.spouse.length > 0
      ? formattedData.spouse[0].dob
      : undefined;

  const dependentsDobs =
    formattedData.dependents && formattedData.dependents.length > 0
      ? formattedData.dependents.map((dependent) => dependent.dob)
      : undefined;

  //Member and spouse ages
  const memAges = calcAges(memberDob);
  const spAges = calcAges(spouseDob);

  //Dependents ages
  const depAges = dependentsAges(dependentsDobs);
  const { adults, children } = categorizeAges(depAges);

  const memberPlan =
    `${adults.length}` * adult_pay +
    `${children.length}` * child_pay +
    base_pay;

  //
  if (isLoading && !currentMember) return <Loading />;

  return (
    <div className={styles.profileHighlights}>
      <>
        <div className={styles.highlights}>
          <div className={styles.contributions}>
            <div className={styles.total}>
              <span className={styles.incidentContribution}>
                {status ? titleCase(status) : "Reviewing"}
              </span>
              <div className={styles.totalDesc}>
                <span className={styles.amount}>
                  ${memberPlan ? memberPlan : 0}
                </span>
                <span>Contribution Per Incident</span>
              </div>
            </div>

            <div className={`${styles.total} ${styles.advancePayment}`}>
              <span className={styles.allPayments}>My Wallet</span>
              <div className={styles.totalDesc}>
                <span className={styles.amount}>$0</span>
                <span>Paid in Advance</span>
              </div>
            </div>
          </div>

          <div className={`${styles.contributions} ${styles.household}`}>
            <div className={styles.familySize}>
              Family size:{" "}
              {children.length +
                adults.length +
                (spouse.length > 0 ? 1 : 0) +
                1}
            </div>
            <div className={styles.householdSize}>
              <div className={styles.householdComposition}>
                <div className={styles.adult}>
                  Head of Household:{" "}
                  <span>{currentMember ? 1 : "No member info"}</span>
                </div>
                <div className={styles.adult}>
                  Spouse: <span>{spouse.length > 0 ? 1 : "No"}</span>
                </div>
                <div className={styles.children}>
                  Children:
                  <span>{children.length > 0 ? children.length : "No"}</span>
                </div>
                <div className={styles.adult}>
                  Adult Dependent(s):{" "}
                  <span>{adults.length > 0 ? adults.length : "No"}</span>
                </div>
              </div>
              <div className={styles.planPayment}>
                ${memberPlan ? memberPlan : 0}
                <p>Per incident</p>
              </div>
            </div>
          </div>
        </div>

        {/* <Payments /> */}
      </>
    </div>
  );
}

export default ProfileHighlights;

function titleCase(input) {
  if (!input || typeof input !== "string") {
    return "";
  }
  // If the input is a single word
  if (input.includes(" ")) {
    const words = input.split(" ");

    // Capitalize each word using titleCase function
    const titleCaseWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1)?.toLowerCase();
    });

    return titleCaseWords.join(" ");
  } else {
    return input.charAt(0).toUpperCase() + input.slice(1)?.toLowerCase();
  }
}

//Destructure the currentMember object
function formatData(apiData) {
  const formattedData = {
    id: apiData.id,
    first_name: apiData.first_name,
    last_name: apiData.last_name,
    middle_name: apiData.middle_name,
    gender: apiData.gender,
    category: apiData.category,
    contacts: apiData.contacts,
    created_at: apiData.created_at,
    dependents: apiData.dependents,
    dob: apiData.dob,
    hometown: apiData.hometown,
    membership: apiData.membership,
    nationality: apiData.nationality,
    reference: apiData.reference,
    spouse: apiData.spouse,
    // Add other properties as needed
  };

  return formattedData;
}

//Calculate member and spouse ages
function calcAges(data) {
  // Function to parse and calculate age from a date string
  function calculateAgeFromDateStr(dob) {
    if (!dob) {
      console.error("No date of birth provided.");
      return null;
    }

    // Define supported date formats
    const dateFormats = [
      "YYYY-MM-DD",
      "YYYY/MM/DD",
      "MM/DD/YYYY",
      "MM-DD-YYYY",
      "YYYY.MM.DD",
      "MM.DD.YYYY",
    ];

    let dobDate;
    for (const format of dateFormats) {
      dobDate = moment(dob, format, true);
      if (dobDate.isValid()) {
        break;
      }
    }

    if (!dobDate.isValid()) {
      console.error("Invalid date format.");
      return null;
    }

    // Calculate age
    const currentDate = moment();
    const age = currentDate.diff(dobDate, "years");
    return age;
  }

  // Handle data as an object
  if (typeof data === "object" && data !== null) {
    const ages = [];

    // Calculate member age
    if (data.memberDob) {
      ages.push(calculateAgeFromDateStr(data.memberDob));
    }

    // Calculate spouse age
    if (data.spouseDob) {
      ages.push(calculateAgeFromDateStr(data.spouseDob));
    }

    // Calculate dependents' ages
    if (data.dependentsDobs && Array.isArray(data.dependentsDobs)) {
      data.dependentsDobs.forEach((dob) => {
        ages.push(calculateAgeFromDateStr(dob));
      });
    }

    return ages;
  } else if (typeof data === "string") {
    // If data is a single date string
    return [calculateAgeFromDateStr(data)];
  } else if (Array.isArray(data)) {
    // If data is an array of date strings
    return data.map((dob) => calculateAgeFromDateStr(dob));
  } else {
    // console.error("Invalid data format. Expected an object, string, or array.");
    return null;
  }
}

//Calculate dependents ages
function dependentsAges(dependentsDobs) {
  if (!Array.isArray(dependentsDobs)) {
    console.error("Dependents data should be an array.");
    return [];
  }

  const currentDate = moment();
  const ages = dependentsDobs.map((dob) => {
    const dobDate = moment(
      dob,
      ["YYYY-MM-DD", "MM/DD/YYYY", "MM-DD-YYYY", "YYYY.MM.DD", "MM.DD.YYYY"],
      true
    );
    if (!dobDate.isValid()) {
      console.error(`Invalid date format: ${dob}`);
      return null;
    }
    return currentDate.diff(dobDate, "years");
  });

  return ages;
}

//Determine adults and children
function categorizeAges(agesArray) {
  const adults = [];
  const children = [];

  agesArray?.forEach((age) => {
    if (age >= 26) {
      adults.push(age);
    } else {
      children.push(age);
    }
  });

  return { adults, children };
}

// function analyzeCustomerData(customer) {
//   const results = [];

//   customer?.forEach((customer) => {
//     const result = {
//       firstName: customer.firstName,
//       lastName: customer.lastName,
//       categoryType: customer.category,
//       hasSpouse: false,
//       hasDependent: false,
//     };

//     // Check if the customer has a spouse
//     if (
//       customer.household &&
//       customer.household.spouse &&
//       Object.keys(customer.household.spouse).length > 0
//     ) {
//       result.hasSpouse = true;
//     }

//     // Check if the customer has at least one dependent
//     if (
//       customer.household &&
//       customer.household.dependents &&
//       customer.household.dependents.length > 0
//     ) {
//       result.hasDependent = true;
//     }

//     results.push(result);
//   });

//   return results;
// }

// // //Check for spouse in the customer object
// function isEmpty(obj) {
//   // Check if obj is not an object or array
//   if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
//     return obj === "" || obj === undefined;
//   }

//   // Check if obj is an empty object
//   if (Object.keys(obj).length === 0) {
//     return true;
//   }

//   // Recursively check nested objects and arrays
//   for (let key in obj) {
//     if (obj.hasOwnProperty(key) && isEmpty(obj[key])) {
//       return true;
//     }
//   }

//   return false;
// }

// // Example usage:
// const apiData = {
//   // Your API data here
// };

// Example usage:
// const data = {
//   dependents: [
//     {
//       dob: "2015-03-24",
//       gender: "F",
//       id: 7,
//       name: "KD Musa",
//       relation: "daughter",
//     },
//     {
//       dob: "1996-03-24",
//       gender: "F",
//       id: 8,
//       name: "Jessica Musa",
//       relation: "daughter",
//     },
//   ],
// };

// const ages = calculateAges(data.dependents);
// console.log("Ages:", ages);

// function calculateAges(data) {
//   if (!data) {
//     console.error("Invalid data: null or undefined.");
//     return null;
//   }

//   if (Array.isArray(data)) {
//     if (data.length === 0) {
//       console.error("Empty data array.");
//       return null;
//     }
//   } else if (typeof data !== "object") {
//     console.error("Invalid data format.");
//     return null;
//   }

//   // Convert single object to array of one object
//   if (!Array.isArray(data)) {
//     data = [data];
//   }

//   const currentDate = new Date();
//   const ages = [];

//   data.forEach((item) => {
//     if (item.dob) {
//       // Extract dob and split it to get year, month, and day components
//       const [year, month, day] = item.dob.split("-").map(Number);

//       // Create a Date object using extracted dob components
//       const dob = new Date(year, month - 1, day); // month is 0-indexed in Date constructor

//       // Calculate age
//       let age = currentDate.getFullYear() - dob.getFullYear();
//       const currentMonth = currentDate.getMonth() + 1;
//       const birthMonth = dob.getMonth() + 1;
//       if (
//         currentMonth < birthMonth ||
//         (currentMonth === birthMonth && currentDate.getDate() < dob.getDate())
//       ) {
//         age--; // Subtract 1 if the birthday hasn't occurred yet this year
//       }
//       ages.push(age);
//     } else {
//       console.error("No date of birth for this customer");
//     }
//   });

//   return ages;
// }

// const singleArrayData = [spouse];

// console.log("Ages (Object):", calcu(member));
// console.log("Ages (Array):", calcu(dependents));
// console.log("Ages (Single Array):", calcu(singleArrayData));
//

//Calculate age of customers
// function calculateAge(dateOfBirth) {
//   if (!dateOfBirth) {
//     console.log("No date of birth for this customer");
//     return;
//   } else {
//     const dob = new Date(dateOfBirth);
//     const now = new Date();
//     let age = now.getFullYear() - dob.getFullYear();
//     const monthDiff = now.getMonth() - dob.getMonth();

//     if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
//       age--;
//     }

//     return age;
//   }
// }

// const customerAge = calculateAge(currentMember.dob);
// console.log(customerAge);

// //Check for spouse in the customer object
// function isEmpty(obj) {
//   // Check if obj is not an object or array
//   if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
//     return obj === "" || obj === undefined;
//   }

//   // Check if obj is an empty object
//   if (Object.keys(obj).length === 0) {
//     return true;
//   }

//   // Recursively check nested objects and arrays
//   for (let key in obj) {
//     if (obj.hasOwnProperty(key) && isEmpty(obj[key])) {
//       return true;
//     }
//   }

//   return false;
// }
// const spouseCount = isEmpty(spouse) ? "No" : 1;

// //Extract dates of birth for dependents
// const extractDoB = (dataArray) => {
//   if (!dataArray) {
//     // console.log("Missing a dependent's date of birth");
//   }
//   return dataArray?.map((item) => item.dependentDob);
// };

// const dobArray = extractDoB(dependents);

// // Calculate age for each dependent's date of birth
// function calculate(dobArray) {
//   const currentDate = new Date();

//   if (dobArray?.length > 0) {
//     return dobArray?.map((date) => {
//       const dob = new Date(date);
//       const ageDiffMs = currentDate - dob;
//       const ageDate = new Date(ageDiffMs);
//       return Math.abs(ageDate.getUTCFullYear() - 1970);
//     });
//   } else {
//     console.log("No dependents");
//   }
// }
// const depAges = calculateAges(dobArray);

// //Determine adults and children
// function categorizeAges(agesArray) {
//   const adults = [];
//   const children = [];

//   agesArray?.forEach((age) => {
//     if (age >= 26) {
//       adults.push(age);
//     } else {
//       children.push(age);
//     }
//   });

//   return { adults, children };
// }
// // Example usage:
// const { adults, children } = categorizeAges(depAges);

// //
// function calculateTotalPayment(dependentsData, householdData, category) {
//   // Define base pay for each category
//   const basePay = {
//     single: 50,
//     singleFamily: 50,
//     family: 100,
//     retired: 25,
//   };

//   // Get base payment based on the formatted category
//   let payment = basePay[category];
//   // Check if the category contains a spouse
//   if (household.spouse && !isEmpty(household.spouse)) {
//     if (category === "retired") {
//       payment += 25;
//     }
//   }

//   // Adjust payment based on the number of dependents
//   if (category !== "single" && depAges?.length > 0) {
//     // Count the number of adults (age 18 or above) and children
//     const numAdults = depAges?.filter((age) => age >= 26).length;
//     const numChildren = depAges?.length - numAdults;

//     // Adjust payment based on the number of adults and children
//     payment += numChildren * 10 + numAdults * 25;
//   }

//   return payment;
// }

// const totalPayment = calculateTotalPayment(depAges, household, category);
// // console.log("Total payment:", totalPayment);
