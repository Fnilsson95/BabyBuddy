<template>
    <div class="pt-5">
        <BCardGroup deck>
            <BCard title="Bonnie Gustavson Olmås" header-tag="header" footer-tag="footer">
                <template #header>
                    <h6 class="mb-0">Bonnie</h6>
                </template>
                <BCardText>
                    <div>
                        5 months
                    </div>
                    <div>No allergies</div>
                </BCardText>
                <BButton href="#" variant="primary">Go somewhere</BButton>
                <template #footer>
                    <em>Footer Slot</em>
                </template>
            </BCard>
            <BCard title="Gösta Olmås" header-tag="header" footer-tag="footer" img-src="src/assets/Gösta.jpeg">
                <template #header>
                    <h6 class="mb-0">Gösta</h6>
                </template>
                <BCardText>
                    <div>
                        4 years
                    </div>
                    <div>
                        Allergic to men
                    </div>
                </BCardText>
                <BButton href="#" variant="primary">Go somewhere</BButton>
                <template #footer>
                    <em>Footer Slot</em>
                </template>
            </BCard>
        </BCardGroup>
    </div>
</template>