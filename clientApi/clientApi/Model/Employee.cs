namespace clientApi.Model
{
    public class Employee
    {
        public int Id { get; set; }
        public required string EmployeeName { get; set; }
        public required string Email { get; set; }
        public required string Phone { get; set; }
        public required string Salary { get; set; }
    }
}
