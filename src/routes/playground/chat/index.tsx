import { $, component$, useStore } from "@builder.io/qwik";

export default component$(() => {
	// Store for text area content and parsed messages
	const store = useStore({
		messageJson: "",
		messages: [] as {
			type: string;
			text?: string;
			content: { ssml: string; text: string };
		}[],
	});

	// Handler to parse and display the messages
	const handleShowPreview = $(() => {
		try {
			const data = JSON.parse(store.messageJson);
			store.messages = data.actions || [];
		} catch (error) {
			alert("Invalid JSON. Please check your format and try again.");
		}
	});

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				margin: "0 auto",
				fontFamily: "Helvetica, Arial, sans-serif",
			}}
			class="container mx-auto"
		>
			{/* Input area for JSON */}
			<h2>Enter Message JSON:</h2>
			<textarea
				rows={10}
				style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
				class="border"
				value={store.messageJson}
				onInput$={(e) => {
					store.messageJson = (e.target as HTMLTextAreaElement).value;
				}}
				placeholder="Paste your JSON here..."
			/>

			{/* Button to parse the text area and generate preview */}
			<button
				type="button"
				style={{
					padding: "10px 20px",
					marginTop: "10px",
					cursor: "pointer",
					backgroundColor: "#1877f2",
					color: "#fff",
					border: "none",
					borderRadius: "4px",
				}}
				onClick$={handleShowPreview}
			>
				Show Preview
			</button>

			{/* Chat preview area */}
			<div
				style={{
					marginTop: "20px",
					border: "1px solid #ccc",
					borderRadius: "8px",
					padding: "16px",
					backgroundColor: "#f0f2f5",
				}}
			>
				<h3>Chat Preview</h3>
				{store.messages.length === 0 && (
					<div style={{ fontStyle: "italic", color: "#666" }}>
						No messages to show. Paste valid JSON and click "Show Preview".
					</div>
				)}

				{store.messages.map((msg, index) => {
					const isSystem = msg.type === "system-message";
					const key = `${index}`;
					return (
						<div
							key={key}
							style={{
								display: "flex",
								justifyContent: isSystem ? "flex-start" : "flex-end",
								margin: "10px 0",
							}}
						>
							<div
								style={{
									maxWidth: "60%",
									backgroundColor: isSystem ? "#fff" : "#0084ff",
									color: isSystem ? "#000" : "#fff",
									padding: "10px",
									borderRadius: "18px",
									boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
								}}
							>
								{msg.content?.text || msg.content?.ssml || msg.text}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
});
