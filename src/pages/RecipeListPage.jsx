import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  Text,
  Badge,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  Input,
  Checkbox,
} from "@chakra-ui/react";
import { data } from "../utils/data";
import { useState } from "react";

export const RecipeListPage = ({ onRecipeSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHealthLabels, setSelectedHealthLabels] = useState([]);

  // Get unique health labels from all recipes
  const allHealthLabels = [
    ...new Set(data.hits.flatMap(({ recipe }) => recipe.healthLabels)),
  ].sort();

  // Filter recipes based on search term and selected health labels
  const filteredRecipes = data.hits.filter(({ recipe }) => {
    const matchesSearch = recipe.label
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesHealthLabels =
      selectedHealthLabels.length === 0 ||
      selectedHealthLabels.every((label) =>
        recipe.healthLabels.includes(label)
      );
    return matchesSearch && matchesHealthLabels;
  });

  const handleHealthLabelChange = (label) => {
    setSelectedHealthLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <VStack spacing={8} w="full">
      <Heading as="h1" size="2xl" color="teal.600" textAlign="center">
        Discover Recipes
      </Heading>

      {/* Search Box */}
      <Box w="full" maxW="600px">
        <Input
          size="lg"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          bg="white"
          boxShadow="sm"
        />
      </Box>

      {/* Search and Filter Section */}
      <Box w="100%" mb={8}>
        <Wrap spacing={4}>
          {allHealthLabels.map((label) => (
            <WrapItem key={label}>
              <Checkbox
                isChecked={selectedHealthLabels.includes(label)}
                onChange={() => handleHealthLabelChange(label)}
              >
                {label}
              </Checkbox>
            </WrapItem>
          ))}
        </Wrap>
      </Box>

      {/* Recipe Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
        {filteredRecipes.map(({ recipe }) => (
          <Box
            key={recipe.label}
            bg="white"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            transition="all 0.3s"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "lg",
            }}
            onClick={() => onRecipeSelect(recipe)}
            cursor="pointer"
          >
            <Image
              src={recipe.image}
              alt={recipe.label}
              h="200px"
              w="full"
              objectFit="cover"
            />
            <VStack p={4} align="stretch" spacing={3}>
              <Heading size="md" noOfLines={2}>
                {recipe.label}
              </Heading>

              <Wrap>
                {recipe.dietLabels.map((label) => (
                  <WrapItem key={label}>
                    <Badge
                      colorScheme="green"
                      px={2}
                      py={1}
                      borderRadius="full"
                    >
                      {label}
                    </Badge>
                  </WrapItem>
                ))}
              </Wrap>

              <HStack>
                <Text fontWeight="bold" color="gray.600">
                  {recipe.mealType[0]}
                </Text>
                <Text color="gray.500">•</Text>
                <Text color="gray.600">{recipe.dishType[0]}</Text>
              </HStack>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};
