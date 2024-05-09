import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import ProjectModel from "../../../../api/projects";
import { CreateProjectForm } from '../CreateProjectForm';

const ProjectContext = createContext();

export const useProjects = () => useContext(ProjectContext);

export const ProjectsProvider = ({ children }) => {

    const [projects, setProjects] = useState([]);

    const [fetchProjects, setFetchProjects] = useState(false);

    const [showCreateForm, setShowCreateForm] = useState(false);

    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const [activeProject, setActiveProject] = useState({});

    const FetchProjects = useCallback(() => { setFetchProjects(v => !v), [fetchProjects] })

    const OpenCreateForm = useCallback(() => {
        setShowCreateForm(true);
    });

    const CloseCreateForm = useCallback(() => {
        setShowCreateForm(false);
    });

    const createProject = useCallback(async (project) => {
        const response = await ProjectModel.createProject(project);
        return [response.status, response.data];
    });

    const OpenUpdateForm = useCallback((project) => {
        setActiveProject(project);
        setShowUpdateForm(true);
    });

    const CloseUpdateForm = useCallback(() => {
        setActiveProject({});
        setShowUpdateForm(false);
    });

    const updateProject = useCallback(async (project) => {
        const response = await ProjectModel.updateProject(project);
        return [response.status, response.data]
    });

    const deleteProject = useCallback(async (id) => {
        const response = await ProjectModel.deleteProject(id);
        return [response.status, response.data]
    });

    useEffect(() => {
        (async () => {
            const response = await ProjectModel.getMyProjects()
            if (response.status === 200) {
                setProjects(response.data);
            }
        })();
    }, [fetchProjects]);

    return (
        <ProjectContext.Provider value={{
            projects,
            createProject, showCreateForm, OpenCreateForm, CloseCreateForm,
            updateProject, showUpdateForm, OpenUpdateForm, CloseUpdateForm, activeProject,
            deleteProject, FetchProjects, fetchProjects,
        }}>
            {projects && children}
        </ProjectContext.Provider>
    );

};

