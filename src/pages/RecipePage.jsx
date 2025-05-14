import {
  Box,
  Button,
  VStack,
  Heading,
  Image,
  Text,
  Badge,
  SimpleGrid,
  List,
  ListItem,
  HStack,
  Wrap,
  WrapItem,
  Center,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

export const RecipePage = ({ recipe, onBack }) => {
  // Round number to 1 decimal place
  const formatNumber = (num) => Math.round(num * 10) / 10;

  // Get total nutrients we want to display
  const nutrients = {
    Energy: recipe.totalNutrients.ENERC_KCAL,
    Protein: recipe.totalNutrients.PROCNT,
    Fat: recipe.totalNutrients.FAT,
    Carbs: recipe.totalNutrients.CHOCDF,
    Cholesterol: recipe.totalNutrients.CHOLE,
    Sodium: recipe.totalNutrients.NA,
  };

  return (
    <Center p={8}>
      <VStack spacing={8} align="stretch">
        <Button
          leftIcon={<ChevronLeftIcon />}
          onClick={onBack}
          variant="ghost"
          alignSelf="flex-start"
          size="lg"
          color="teal.600"
        >
          Back to Recipes
        </Button>

        <Box bg="white" borderRadius="xl" overflow="hidden" boxShadow="md">
          <Image
            src={recipe.image}
            alt={recipe.label}
            w="full"
            h={{ base: "200px", md: "400px" }}
            objectFit="cover"
          />

          <VStack p={{ base: 4, md: 8 }} spacing={6} align="stretch">
            <Heading size="xl" color="teal.600">
              {recipe.label}
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {/* Basic Info */}
              <HStack>
                <Text fontWeight="bold">Time:</Text>
                <Text>{recipe.totalTime} minutes</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Meal Type:</Text>
                <Text>{recipe.mealType.join(", ")}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Dish Type:</Text>
                <Text>{recipe.dishType.join(", ")}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">Servings:</Text>
                <Text>{recipe.yield}</Text>
              </HStack>
            </SimpleGrid>

            {/* Diet Labels */}
            {recipe.dietLabels.length > 0 && (
              <Box>
                <Text fontWeight="bold" mb={2}>
                  Diet:
                </Text>
                <Wrap>
                  {recipe.dietLabels.map((label) => (
                    <WrapItem key={label}>
                      <Badge colorScheme="green">{label}</Badge>
                    </WrapItem>
                  ))}
                </Wrap>
              </Box>
            )}

            {/* Health Labels */}
            <Box>
              <Text fontWeight="bold" mb={2}>
                Health Labels:
              </Text>
              <Wrap>
                {recipe.healthLabels.map((label) => (
                  <WrapItem key={label}>
                    <Badge colorScheme="teal" px={2} py={1} borderRadius="full">
                      {label}
                    </Badge>
                  </WrapItem>
                ))}
              </Wrap>
            </Box>

            {/* Cautions */}
            {recipe.cautions.length > 0 && (
              <Box>
                <Text fontWeight="bold" mb={2}>
                  Cautions:
                </Text>
                <Wrap>
                  {recipe.cautions.map((caution) => (
                    <WrapItem key={caution}>
                      <Badge colorScheme="red">{caution}</Badge>
                    </WrapItem>
                  ))}
                </Wrap>
              </Box>
            )}

            {/* Ingredients */}
            <Box>
              <Heading size="md" mb={4}>
                Ingredients
              </Heading>
              <List spacing={2}>
                {recipe.ingredientLines.map((ingredient) => (
                  <ListItem
                    key={ingredient}
                    p={2}
                    bg="gray.50"
                    borderRadius="md"
                  >
                    {ingredient}
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Nutrition */}
            <Box>
              <Heading size="md" mb={4}>
                Nutrition per serving
              </Heading>
              <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
                {Object.entries(nutrients).map(([name, nutrient]) => (
                  <Box
                    key={name}
                    p={4}
                    bg="gray.50"
                    borderRadius="md"
                    textAlign="center"
                  >
                    <Text fontWeight="bold">{name}</Text>
                    <Text>
                      {formatNumber(nutrient.quantity)}
                      {nutrient.unit}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Center>
  );
};
