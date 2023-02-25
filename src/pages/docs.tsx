import { Box, Container, Heading, Text } from "@chakra-ui/react";

import Nav from "@/layouts/nav/nav";

export default function DocsIndex() {
	// ESTADOS

	return (
		<Nav>
			{/* <main className={styles.main}> */}
			<Box minWidth="full" maxWidth="container.xl" h="full" my={12}>
				<Container maxW={{ base: "container.sm", lg: "container.xl" }}>
					<Heading>Kirbank Docs</Heading>
					<Text mt={3} fontSize={{ base: "sm", lg: "md" }}>
						Nulla quis mattis eros. Fusce elit tellus, pretium ut viverra et, tincidunt nec ex. Phasellus bibendum dignissim lectus condimentum lacinia. Vivamus est elit,
						consequat ut ex a, semper ultrices nulla. Proin nec blandit risus. Pellentesque sit amet nunc dictum nulla ornare porta eget vitae eros. Sed et semper nulla. Maecenas
						consequat vulputate ultrices.
					</Text>
					<Text mt={3} fontSize={{ base: "sm", lg: "md" }}>
						Quisque gravida pharetra sem, vel interdum libero lobortis eget. Donec bibendum metus quis massa tincidunt sollicitudin. In consectetur odio non tristique dapibus.
						Sed tortor dolor, tempus ut felis et, aliquet bibendum tortor. Donec turpis nibh, egestas sit amet auctor non, interdum in risus. Donec suscipit, tellus a tempus
						faucibus, elit est consectetur mi, eu sagittis nunc magna sed ipsum. Nulla elementum libero felis. Etiam convallis sed tellus id imperdiet.
					</Text>
					<Text mt={3} fontSize={{ base: "sm", lg: "md" }}>
						Integer sagittis lacinia augue, non imperdiet lorem. Quisque maximus lacus a urna tincidunt, non faucibus mi maximus. Donec lectus neque, hendrerit vel iaculis sed,
						imperdiet sed lacus. Sed eget neque fringilla, vestibulum metus eget, iaculis dui. Morbi lobortis mi nec felis sollicitudin, a interdum nunc sollicitudin. Sed rutrum
						non eros pellentesque dignissim. Vivamus ante nulla, iaculis id ante sit amet, lobortis condimentum erat. Nunc ac convallis tortor. Etiam quis rhoncus dolor. In
						sodales porta turpis. Nunc sodales pellentesque justo, ut faucibus elit tincidunt vitae. Nullam ante enim, tincidunt in consequat in, facilisis id arcu. Vivamus quam
						orci, dictum a auctor sed, vehicula vitae mauris.
					</Text>
				</Container>
			</Box>
		</Nav>
	);
}
