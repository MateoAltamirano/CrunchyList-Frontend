import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import { useCallback, useContext, useEffect } from "react";
import { getTopAnimes } from "../api/animes";
import Card from "../components/Card";
import TopAnimeList from "../components/TopAnimeList";
import { animesContext } from "../providers/AnimesContext";
import { Status } from "../utils/types";
import { useParams } from "react-router-dom";

const Searchuser = () => {
  let userName: { userName: string } = useParams();

  return (
    <h1>buscar amigo</h1>
  )
}

export default Searchuser;
