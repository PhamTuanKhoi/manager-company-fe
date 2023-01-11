import { createSelector } from "@reduxjs/toolkit";
import { customText } from "../../constant";

export const searchNameProject = (state) => state.project.searchName;

export const projectsSelector = (state) => state.project;

export const projectsRemainingSelector = createSelector(
   projectsSelector,
   searchNameProject,

   (projectList, nameText) => {
      return projectList?.projects?.filter((item) =>
         customText(item?.name).includes(customText(nameText))
      );
   }
);
