import React from "react";
import {
	Box,
	Button,
	Flex,
	FlexProps,
	Heading,
	HStack,
	useDisclosure,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	StackProps,
	VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../providers/AuthProvider";
import { Avatar } from "../Avatar";
import { useNavigate } from "react-router-dom";
import { UserHeaderButton } from "../UserHeaderButton";

function MenuButtons() {
	const authContext = useAuth();
	const navigate = useNavigate();

	return (
		<>
			<UserHeaderButton />
		</>
	);
}

function NavDrawer(props: {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
	btnRef: React.RefObject<HTMLButtonElement>;
}) {
	return (
		<Drawer
			isOpen={props.isOpen}
			placement="right"
			onClose={props.onClose}
			finalFocusRef={props.btnRef}
		>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>Create your account</DrawerHeader>

				<DrawerBody>
					<VStack spacing={16}>
						<MenuButtons />
					</VStack>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
}

export function DashboardHeader(props: FlexProps) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef(null);

	return (
		<>
			<Flex
				w="100%"
				justifyContent={"space-between"}
				alignItems={"center"}
				paddingY={4}
				paddingX={[4, 8, 16]}
				{...props}
			>
				<Box>
					<Heading fontSize={"2xl"}>
						<Link to="/">jixed</Link>
					</Heading>
				</Box>
				<HStack spacing={4} display={["none", "flex"]}>
					<MenuButtons />
				</HStack>
				<Button
					display={["flex", "none"]}
					justifyContent="center"
					alignItems={"center"}
					ref={btnRef}
					onClick={onOpen}
				>
					<FontAwesomeIcon icon={faBars} />
				</Button>
			</Flex>
			<NavDrawer
				btnRef={btnRef}
				isOpen={isOpen}
				onOpen={onOpen}
				onClose={onClose}
			/>
		</>
	);
}
