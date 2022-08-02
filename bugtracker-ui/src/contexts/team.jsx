import { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../services/apiClient";

const TeamContext = createContext(null);

// context to keep track of a users teams, the current team selected, and whether or not the teamModal should be displayed.
export const TeamContextProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [currentTeam, setCurrentTeam] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [teamModal, setTeamModal] = useState(false);
  const [teamsTableData, setTeamsTableData] = useState([])
  const [ids, setIds] = useState([])

  //const [ids, setIds] = useState([])
  //const [tableData, setTableData] = useState([])

  const clearTeams = () => {
    setTeams([])
  }

  const fetchTeams = async () => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await apiClient.listAllTeams();
    if (data) {
      setTeams(data.teamList);
    }
    if (error) {
      setError(error);
    }
    setIsLoading(false);
  };



  const fetchTeamsTableData = async () => {
    console.log("Inside fetchTeamsTableData")
    console.log(teams)
    //const tableData = []
    setTeamsTableData([])
    teams.map(async (team) => {
      const memberList = await apiClient.fetchMemberList(team.id)
      console.log("memberList below")
      console.log(memberList)
      //let memberNames = [];
      
        console.log("Inside memberList")
        console.log(memberList.data.members);
        let memberNames = []
        memberList?.data?.members.map((member) => {
          memberNames.push(member.full_name)
        })
        console.log("MemberNames below")
        console.log(memberNames)
        console.log(memberNames.join(", "))

        //tableData.push({id: team.id, name: team.name, members: "testMembers"/*memberNames.join(", ")*/ }
        await setTeamsTableData(prev => [...prev, {id: team.id, name: team.name, members: memberNames.join(", ")}])
        console.log("Teamstabledata below")
        console.log(teamsTableData)
    
      //tableData.push({id: team.id, name: team.name, members: memberNames.join(", ") })
      /*let memberNames = []
      memberList.map((member) => {
        memberNames.push(member.name)
      }) 
      /*tableData.push({id: team.id, name: team.name/*, members: memberNames.join(", ") }) */
    })
   
  }

  function idExists(passedId) {
    return teamsTableData.some( function (el) {
      return el.id = passedId
    });
  }

  async function getData() {
    // console.log("Teams length:", teams.length)
    setTeamsTableData([])
    
    
    let teamIds = []
    teams.map(async (team) => {
      const memberList = await apiClient.fetchMemberList(team.id)
      console.log("memberList", memberList)
      teamIds.push(team.id)
      // console.log("Inside memberList")
      // console.log(memberList.data.members);
      let memberNames = []
      memberList?.data?.members.map((member) => {
        memberNames.push(member.full_name)
      }) 
      
      //let new_team = {id: team.id, name: team.name, members: memberNames.join(", ")}
      //console.log("old_team", tableData)
      //console.log("new_team", new_team)
      
      /*let id = 1
      var exists = false //tableData.find(check.id === id)
      ids.forEach((id) => {
        if (teamsTableData.find(exists.id === id) !== undefined) {
          exists = true
        }
      }) */
      //let exists = idExists(team.id)
      //console.log("exists", exists)
      /* teamsTableData.some(element => {
        if (element.id === team.id) {
          exists = true;
        }
    
        exists = false;
      }); */

      //if (!exists) {
        setTeamsTableData(prev => [...prev, {id: team.id, name: team.name, members: memberNames.join(", ")}]);
        //setIds(prev => [...prev, team.id])
      //} 
    })
    //console.log("teamIds:", teamIds)
    //const teamData = await apiClient.fetchTeamMembers(teamIds)
    //console.log("teamData:", teamData)

    //console.log("tableData below")
    //console.log(tableData)
    //setIsLoading(false) 
  }

  useEffect(() => {
    fetchTeams();
    //getData()
    //fetchTeamsTableData();

  }, [setTeams, currentTeam]);

  const teamValue = {
    teams,
    setTeams,
    currentTeam,
    setCurrentTeam,
    isLoading,
    fetchTeams,
    fetchTeamsTableData,
    teamModal,
    setTeamModal,
    teamsTableData,
    setTeamsTableData,
    clearTeams,
    getData
  };

  return (
    <TeamContext.Provider value={teamValue}>
      <>{children}</>
    </TeamContext.Provider>
  );
};

export const useTeamContext = () => useContext(TeamContext);
