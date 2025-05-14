import { useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import { RecipeListPage } from "./pages/RecipeListPage";
import { RecipePage } from "./pages/RecipePage";

export const App = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleBackClick = () => {
    setSelectedRecipe(null);
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.xl" py={8}>
        {selectedRecipe ? (
          <RecipePage recipe={selectedRecipe} onBack={handleBackClick} />
        ) : (
          <RecipeListPage onRecipeSelect={setSelectedRecipe} />
        )}
      </Container>
    </Box>
  );
};
