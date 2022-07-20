import React from "react";

import { render, cleanup, waitForElement, queryByText, fireEvent, prettyDOM, getByText, getByPlaceholderText, getAllByTestId, getByAltText, getByTestId } from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";


afterEach(cleanup);
describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });

  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));


    // 3. Call Appointments
    const appointments = getAllByTestId(container, "appointment");


    //4. Call booked Appointment
    const appointment = appointments[1]


    //5. Click alt="Delete" button
    fireEvent.click(getByAltText(appointment, "Delete"))

    //6. Check that CONFIRM message "Are you sure you would like to delete?" on document
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    //7. Click Confirm on Confirm page

    fireEvent.click(getByText(appointment, "Confirm"))


    //8. Check Loading page Deleting

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    //9. Wait until the element with the "Add" button is displayes
    await waitForElement(() => getByAltText(appointment, "Add"));

    //10. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();


  });

  xit("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // // 3. Call Appointments
    const appointments = getAllByTestId(container, "appointment");

    // //4. Call booked Appointment
    const appointment = appointments[1]

    // //5. Click alt="Edit" button
    fireEvent.click(getByAltText(appointment, "Edit"))

    //6. Change the student name to Sae
    fireEvent.change(getByTestId(appointment, "student-name-input"), {
      target: { value: "Anya Forger" }
    });
    // console.log(prettyDOM(appointment))

    //7. Change Interviewers Current: "Tori Malcolm" => to alt="Sylvia Palmer"
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))

    // 8. Click Save on Change

    fireEvent.click(getByText(appointment, "Save"))


    // 9. Check Loading page Saving

    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    //9. Wait until the element with the "Show"  is displayes
    await waitForElement(() => getByText(container, "Anya Forger"));

    //10. Check new name is on the appointment

    expect(getByText(container, "Anya Forger")).toBeInTheDocument();

    //11. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  })

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Call Appointments
    const appointments = getAllByTestId(container, "appointment");

    //4. Call New Appointment
    const appointment = appointments[0]


    // 5. Click Add Button (Adding New Appointment => Form)
    fireEvent.click(getByAltText(appointment, "Add"));


    // 6. Put Anya Forger
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Anya Forger" }
    });
    // 7. Click Interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 8. Click Save
    fireEvent.click(getByText(appointment, "Save"));

    // 9. Show Loading Page : SAVING
    expect(getByText(appointment, "SAVING")).toBeInTheDocument();


    // 9. Check Error Message : ERROR_SAVE :"Could not Save appointment"
    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Could not Save appointment")).toBeInTheDocument();

    //10. Click close button in Error Message alt = "Close"
    fireEvent.click(getByAltText(appointment, "Close"))

    //11. Check it goes back to "Form" 
    expect(getByTestId(appointment, "student-name-input")).toBeInTheDocument();

    //12. Check if name is empty
    expect(getByPlaceholderText(appointment, "Enter Student Name")).toHaveValue("");

    //13. Check remaing spots
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();



  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));


    // 3. Call Appointments
    const appointments = getAllByTestId(container, "appointment");


    //4. Call booked Appointment
    const appointment = appointments[1]


    //5. Click alt="Delete" button
    fireEvent.click(getByAltText(appointment, "Delete"))

    //6. Check that CONFIRM message "Are you sure you would like to delete?" on document
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    //7. Click Confirm on Confirm page
    fireEvent.click(getByText(appointment, "Confirm"))


    //8. Check Loading page Deleting
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  

    // 9. Check Error Message : ERROR_DELETE :"Could not Delete appointment"
    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Could not Delete appointment")).toBeInTheDocument();

    //10. Click close button in Error Message alt = "Close"
    fireEvent.click(getByAltText(appointment, "Close"))
    

    //11. Check it goes back to Show form and remains same as before
    expect(getByText(container, "Archie Cohen")).toBeInTheDocument();

    //12. Check remaing spots
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();


  })




});


