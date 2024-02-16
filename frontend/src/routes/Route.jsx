import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { PrivateRoute } from "./PrivateRoute";
import { AdminPrivateRoute } from "./AdminPrivateRoute";
import { Paths } from "../config/Paths";
import Mypage from "../pages/mypage/Mypage";
import EditProfile from "../pages/mypage/EditProfile";
import Reservation from "../pages/reservation/Reservation";
import Dashboard from "../pages/dashboard/Dashboard";
import Information from "../pages/selection/Information";
import Solution from "../pages/selection/Solution";
import ShowEvent from "../pages/event/ShowEvent";
import ShowEs from "../pages/entry_sheet/ShowEs";
import EventHistories from "../pages/event/EventHistories";
import ShowArticle from "../pages/article/ShowArticle";
import ShowCaseStudy from "../pages/case_study/ShowCaseStudy";
import CaseStudyHistories from "../pages/case_study/CaseStudyHistories";
import CaseStudyEditHistory from "../pages/case_study/CaseStudyEditHistories";
import ShowCompany from "../pages/company/ShowCompany";
import ShowMentor from "../pages/mentor/ShowMentor";
import EntrySheetCorrection from "../pages/entry_sheet/EntrySheetCorrection";
import Purchase from "../pages/tickets/Purchase";
import ESCaseStudy from "../pages/entry_sheet/register";
import ESHistory from "../pages/entry_sheet/eshistory";

import AdminDashboard from "../pages/dashboard/AdminDashboard";
import AdminLogin from "../pages/auth/AdminLogin";
import Mentees from "../pages/mentee/Mentees";
import TicketHistory from "../pages/tickets/TicketHistory";
import EditMentee from "../pages/mentee/EditMentee";
import RegisterMentee from "../pages/mentee/RegisterMentee";
import Mentors from "../pages/mentor/Mentors";
import EditMentor from "../pages/mentor/EditMentor";
import RegisterMentor from "../pages/mentor/RegisterMentor";
import Events from "../pages/event/Events";
import EntrySheets from "../pages/entry_sheet/EntrySheets";
import CaseStudies from "../pages/case_study/CaseStudies";
import CaseStudyCorrection from "../pages/case_study/CaseStudyCorrection";
import EditCaseStudy from "../pages/case_study/EditCaseStudy";
import CreateCaseStudy from "../pages/case_study/CreateCaseStudy";
import CreateEvent from "../pages/event/CreateEvent";
import EditEvent from "../pages/event/EditEvent";
import Companies from "../pages/company/Companies";
import EditCompany from "../pages/company/EditCompany";
import CreateCompany from "../pages/company/CreateCompany";
import CorrectionCaseStudy from "../pages/case_study/CorrectionCaseStudy";
import CorrectionEntrySheet from "../pages/entry_sheet/CorrectionEntrySheet";
import Industries from "../pages/industry/Industries";
import CreateIndustry from "../pages/industry/CreateIndustry";
import EditIndustry from "../pages/industry/EditIndustry";
import Articles from "../pages/article/Articles";
import CreateArticle from "../pages/article/CreateArticle";
import EditArticle from "../pages/article/EditArticle";
// 2024-01-11 06:30:00 Fatty Begin
import SelectionInfo from "../pages/selection/SelectionInfos";
import EditSelInfo from "../pages/selection/EditSelInfo";
import CreateCompanyReview from "../pages/company/CreateCompanyReview";
import Comments from "../pages/case_study_comments/Comments";
import Calandar from "../pages/reservation/Calandar";
//

import AdminZooms from "../pages/zoom/Zooms"
import CreateZooms from "../pages/zoom/CreateZoom"
import EditZoom from "../pages/zoom/EditZoom"

export const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path={Paths.adminZooms}
            element={
              <AdminPrivateRoute path={Paths.adminZooms}>
                <AdminZooms />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminCreateZooms}
            element={
              <AdminPrivateRoute path={Paths.adminCreateZooms}>
                <CreateZooms />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminEditZooms}
            element={
              <AdminPrivateRoute path={Paths.adminEditZooms}>
                <EditZoom />
              </AdminPrivateRoute>
            }
          />
          <Route path={Paths.login} element={<Login />} />
          <Route path={Paths.register} element={<Register />} />

          <Route
            path={Paths.createSelInfo}
            element={
              <PrivateRoute path={Paths.createSelInfo}>
                <EditSelInfo />
              </PrivateRoute>
            }
          />

          <Route
            path={Paths.esHistory}
            element={
              <PrivateRoute path={Paths.esHistory}>
                <ESHistory />
              </PrivateRoute>
            }
          />
          <Route
            path={Paths.calandar}
            element={
              <PrivateRoute path={Paths.calandar}>
                <Calandar />
              </PrivateRoute>
            }
          />

          <Route
            path={Paths.eSCaseStudy}
            element={
              <PrivateRoute path={Paths.eSCaseStudy}>
                <ESCaseStudy />
              </PrivateRoute>
            }
          />

          <Route
            path={Paths.comments}
            element={
              <PrivateRoute path={Paths.comments}>
                <Comments />
              </PrivateRoute>
            }
          />

          <Route
            path={Paths.reservation}
            element={
              <PrivateRoute path={Paths.reservation}>
                <Reservation />
              </PrivateRoute>
            }
          />
          <Route
            path={Paths.createCompanyReview}
            element={
              <PrivateRoute path={Paths.createCompanyReview}>
                <CreateCompanyReview />
              </PrivateRoute>
            }
          />
          <Route
            path={Paths.mypage}
            element={
              <PrivateRoute path={Paths.mypage}>
                <Mypage />
              </PrivateRoute>
            }
          />
          <Route
            path={Paths.editProfile}
            element={
              <PrivateRoute path={Paths.editProfile}>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route
            path={Paths.dashboard}
            element={
              <PrivateRoute path={Paths.dashboard}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path={Paths.selectionInfo}
            element={
              <PrivateRoute path={Paths.selectionInfo}>
                <Information />
              </PrivateRoute>
            }
          />
          <Route
            path={Paths.selectionSolution}
            element={
              <PrivateRoute path={Paths.selectionSolution}>
                <Solution />
              </PrivateRoute>
            }
          />
          <Route
            path={Paths.eventHistory}
            element={
              <PrivateRoute path={Paths.eventHistory}>
                <EventHistories />
              </PrivateRoute>
            }
          />
          <Route
            path={Paths.showEvent}
            element={
              <PrivateRoute path={Paths.showEvent}>
                <ShowEvent />
              </PrivateRoute>
            }
          />
          <Route
            path={Paths.showEs}
            element={
              <PrivateRoute path={Paths.showEs}>
                <ShowEs />
              </PrivateRoute>
            }
          />
          <Route
            path={Paths.showArticle}
            element={
              <PrivateRoute path={Paths.showArticle}>
                <ShowArticle />
              </PrivateRoute>
            }
          />
          <Route
            path={Paths.showCaseStudy}
            element={
              <PrivateRoute path={Paths.showCaseStudy}>
                <ShowCaseStudy />
              </PrivateRoute>
            }
          />
          <Route
            path={Paths.showCompany}
            element={
              <PrivateRoute path={Paths.showCompany}>
                <ShowCompany />
              </PrivateRoute>
            }
          />
          <Route
            path={Paths.showMentor}
            element={
              <PrivateRoute path={Paths.showMentor}>
                <ShowMentor />
              </PrivateRoute>
            }
          />
          <Route
            path={Paths.caseStudyHistory}
            element={
              <PrivateRoute path={Paths.caseStudyHistory}>
                <CaseStudyHistories />
              </PrivateRoute>
            }
          /> 
          <Route
            path={Paths.caseStudyEditHistory}
            element={
              <PrivateRoute path={Paths.caseStudyEditHistory}>
                <CaseStudyEditHistory />
              </PrivateRoute>
            }
          />
          <Route
            path={Paths.entrySheetCorrection}
            element={
              <PrivateRoute path={Paths.entrySheetCorrection}>
                <EntrySheetCorrection />
              </PrivateRoute>
            }
          />
          <Route
            path={Paths.caseStudyCorrection}
            element={
              <PrivateRoute path={Paths.caseStudyCorrection}>
                <CaseStudyCorrection />
              </PrivateRoute>
            }
          />
          <Route
            path={Paths.ticketPurchase}
            element={
              <PrivateRoute path={Paths.ticketPurchase}>
                <Purchase />
              </PrivateRoute>
            }
          />
          <Route
            path={Paths.adminDashboard}
            element={
              <AdminPrivateRoute path={Paths.adminDashboard}>
                <AdminDashboard />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminMentees}
            element={
              <AdminPrivateRoute path={Paths.adminMentees}>
                <Mentees />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminTicketHistory}
            element={
              <AdminPrivateRoute path={Paths.adminTicketHistory}>
                <TicketHistory />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminMentors}
            element={
              <AdminPrivateRoute path={Paths.adminMentors}>
                <Mentors />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminEditMentee}
            element={
              <AdminPrivateRoute path={Paths.adminEditMentee}>
                <EditMentee />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminRegisterMentee}
            element={
              <AdminPrivateRoute path={Paths.adminRegisterMentee}>
                <RegisterMentee />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminEditMentor}
            element={
              <AdminPrivateRoute path={Paths.adminEditMentor}>
                <EditMentor />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminRegisterMentor}
            element={
              <AdminPrivateRoute path={Paths.adminRegisterMentor}>
                <RegisterMentor />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminEvents}
            element={
              <AdminPrivateRoute path={Paths.adminEvents}>
                <Events />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminCaseStudies}
            element={
              <AdminPrivateRoute path={Paths.adminCaseStudies}>
                <CaseStudies />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminEntrySheets}
            element={
              <AdminPrivateRoute path={Paths.adminEntrySheets}>
                <EntrySheets />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminCreateEvent}
            element={
              <AdminPrivateRoute path={Paths.adminCreateEvent}>
                <CreateEvent />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminEditEvent}
            element={
              <AdminPrivateRoute path={Paths.adminEditEvent}>
                <EditEvent />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminCreateCaseStudy}
            element={
              <AdminPrivateRoute path={Paths.adminCreateCaseStudy}>
                <CreateCaseStudy />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminEditCaseStudy}
            element={
              <AdminPrivateRoute path={Paths.adminEditCaseStudy}>
                <EditCaseStudy />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminCorrectionEntrySheet}
            element={
              <AdminPrivateRoute path={Paths.adminCorrectionEntrySheet}>
                <CorrectionEntrySheet />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminCompanies}
            element={
              <AdminPrivateRoute path={Paths.adminCompanies}>
                <Companies />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminEditCompany}
            element={
              <AdminPrivateRoute path={Paths.adminEditCompany}>
                <EditCompany />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminCreateCompany}
            element={
              <AdminPrivateRoute path={Paths.adminCreateCompany}>
                <CreateCompany />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminCorrectionCaseStudy}
            element={
              <AdminPrivateRoute path={Paths.adminCorrectionCaseStudy}>
                <CorrectionCaseStudy />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminIndustries}
            element={
              <AdminPrivateRoute path={Paths.adminIndustries}>
                <Industries />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminCreateIndustry}
            element={
              <AdminPrivateRoute path={Paths.adminCreateIndustry}>
                <CreateIndustry />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminEditIndustry}
            element={
              <AdminPrivateRoute path={Paths.adminEditIndustry}>
                <EditIndustry />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminSIs}
            element={
              <AdminPrivateRoute path={Paths.adminSIs}>
                <SelectionInfo />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminCreateSI}
            element={
              <AdminPrivateRoute path={Paths.adminCreateSI}>
              <EditSelInfo />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminEditSI}
            element={
              <AdminPrivateRoute path={Paths.adminEditSI}>
                <EditSelInfo />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminArticles}
            element={
              <AdminPrivateRoute path={Paths.adminArticles}>
                <Articles />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminCreateArticle}
            element={
              <AdminPrivateRoute path={Paths.adminCreateArticle}>
                <CreateArticle />
              </AdminPrivateRoute>
            }
          />
          <Route
            path={Paths.adminEditArticle}
            element={
              <AdminPrivateRoute path={Paths.adminEditArticle}>
                <EditArticle />
              </AdminPrivateRoute>
            }
          />
          <Route path={Paths.adminLogin} element={<AdminLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}