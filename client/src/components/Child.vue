<template>
    <div class="pt-3">
        <BCardGroup deck>
            <BCard title="Bonnie Gustavson Olmås" header-tag="header" footer-tag="footer">
                <template #header>
                    <h6 class="mb-0">
                        <BImg src="" fluid alt="Responsive image" />
                    </h6>
                </template>
                <BCardText>
                    <div>
                        5 months
                    </div>
                    <div>No allergies</div>
                </BCardText>
                <Modal>
                    <template #content>
                        <ChildForm />
                    </template>
                    <template #button>Edit Bonnie</template>
                </Modal>
                <template #footer>
                    <em>Footer Slot</em>
                </template>
            </BCard>
            <BCard title="Gösta Olmås" header-tag="header" footer-tag="footer">
                <template #header>
                    <h6 class="mb-0">
                        <BImg src="src/assets/Gösta.jpeg" fluid alt="Responsive image" />
                    </h6>
                </template>
                <BCardText>
                    <div>
                        4 years
                    </div>
                    <div>
                        Allergic to men
                    </div>
                </BCardText>

                <!-- <BButton href="#" variant="primary">Settings</BButton> -->
                <Modal>
                    <template #content>
                        <ChildForm />
                    </template>
                    <template #button>Edit Gösta</template>
                </Modal>
                <template #footer>
                    <em>Footer Slot</em>
                </template>
            </BCard>
        </BCardGroup>
    </div>
</template>

<script>
import Modal from './Modal.vue'
import ChildForm from '@/components/ChildForm.vue'
</script>
